document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetail");
  if (!container) return;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id")) || 1;
  const p = getProductById(id);
  if (!p) {
    container.innerHTML =
      '<div class="alert alert-warning">Không tìm thấy sản phẩm</div>';
    return;
  }
  addRecentlyViewed(id);
  let selectedVariant = p.colors[0],
    qty = 1;

  document.title = p.name + " | TechZone";

  container.innerHTML = `
    <nav aria-label="breadcrumb"><ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="${typeof getRelativePath === "function" ? getRelativePath("index.html") : "../index.html"}">Trang chủ</a></li>
      <li class="breadcrumb-item"><a href="${typeof getRelativePath === "function" ? getRelativePath("products.html?cat=" + p.category) : "products.html?cat=" + p.category}">${categories.find((c) => c.id === p.category)?.name || "Sản phẩm"}</a></li>
      <li class="breadcrumb-item active">${p.name}</li>
    </ol></nav>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="detail-gallery">
          <div class="position-relative bg-body-tertiary rounded-4 p-3 mb-2 text-center">
            <img id="mainImg" src="${p.images[0]}" class="img-fluid rounded main-img" alt="${p.name}" onerror="handleImgError(this, '${p.category}', '${p.name.replace(/'/g, "\\'")}')">
            ${p.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-3 fs-6">-${p.discount}%</span>` : ""}
          </div>
          <div class="d-flex gap-2 mt-3 overflow-auto pb-2">
            ${p.images.map((img, i) => `<img src="${img}" class="thumb ${i === 0 ? "active" : ""}" onclick="document.getElementById('mainImg').src='${img}';document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active')" onerror="handleImgError(this, '${p.category}', '${p.name.replace(/'/g, "\\'")}')">`).join("")}
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-warning text-dark">${getBrandName(p.brand)}</span>
          <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25"><i class="bi bi-check-circle-fill"></i> Còn hàng</span>
        </div>
        <h2 class="fw-bold mb-2">${p.name}</h2>
        <div class="d-flex align-items-center gap-3 mb-3 flex-wrap">
          <div class="text-warning">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div>
          <span class="text-muted small">${p.reviews} đánh giá</span>
          <span class="text-muted small">Đã bán ${p.sold}</span>
          <button class="btn btn-sm btn-outline-secondary ms-auto" onclick="navigator.clipboard.writeText(location.href);showToast('Đã sao chép liên kết sản phẩm!', 'success')" title="Chia sẻ">
            <i class="bi bi-share"></i> Chia sẻ
          </button>
        </div>
        <div class="bg-warning bg-opacity-10 rounded-4 p-3 mb-3">
          <div class="d-flex align-items-baseline gap-2">
            <h3 class="text-danger fw-bold mb-0">${formatPrice(p.price)}</h3>
            ${p.oldPrice ? `<span class="text-muted text-decoration-line-through">${formatPrice(p.oldPrice)}</span><span class="badge bg-danger">-${p.discount}%</span>` : ""}
          </div>
          <small class="text-success"><i class="bi bi-lightning-fill"></i> Tiết kiệm ${formatPrice(p.oldPrice ? p.oldPrice - p.price : 0)}</small>
        </div>

        <div class="p-2 mb-3 rounded border border-warning bg-warning bg-opacity-10 d-flex justify-content-between align-items-center small">
          <div><i class="bi bi-ticket-perforated-fill text-warning me-1"></i> Mã giảm giá: <strong>TECH10</strong> (Giảm 10%)</div>
          <button class="btn btn-sm btn-warning py-0 px-2 fw-semibold" onclick="navigator.clipboard.writeText('TECH10');showToast('Đã copy mã TECH10! Dùng ở giỏ hàng nhé', 'success')">Copy</button>
        </div>

        <div class="mb-3">
          <label class="fw-semibold mb-2 d-block">Màu sắc:</label>
          <div class="d-flex flex-wrap gap-2">
            ${p.colors.map((c, i) => `<button class="btn btn-outline-dark variant-btn ${i === 0 ? "active" : ""}" onclick="selectVariant(this,'${c}')">${c}</button>`).join("")}
          </div>
        </div>
        <div class="mb-3 d-flex align-items-center gap-3">
          <label class="fw-semibold">Số lượng:</label>
          <div class="input-group" style="width:140px">
            <button class="btn btn-outline-secondary" onclick="changeQty(-1)">-</button>
            <input type="text" class="form-control text-center" id="qtyInput" value="1" readonly>
            <button class="btn btn-outline-secondary" onclick="changeQty(1)">+</button>
          </div>
        </div>
        <div class="d-flex gap-2 mb-3">
          <button class="btn btn-warning btn-lg flex-grow-1 fw-bold" onclick="doAdd()"><i class="bi bi-cart-plus"></i> Thêm giỏ</button>
          <button class="btn btn-danger btn-lg flex-grow-1 fw-bold" onclick="doAdd(true)">Mua ngay</button>
          <button class="btn btn-outline-danger btn-lg" onclick="toggleWishlist(${p.id})" title="Thêm yêu thích"><i class="bi bi-heart"></i></button>
          <button class="btn btn-outline-primary btn-lg" onclick="toggleCompare(${p.id})" title="So sánh"><i class="bi bi-arrow-left-right"></i></button>
        </div>
        <div class="row g-2 text-center small">
          <div class="col-4"><div class="p-2 border rounded"><i class="bi bi-shield-check text-warning fs-4"></i><div>Bảo hành 12 tháng</div></div></div>
          <div class="col-4"><div class="p-2 border rounded"><i class="bi bi-truck text-warning fs-4"></i><div>Freeship toàn quốc</div></div></div>
          <div class="col-4"><div class="p-2 border rounded"><i class="bi bi-arrow-repeat text-warning fs-4"></i><div>Đổi trả 30 ngày</div></div></div>
        </div>
      </div>
    </div>

    <ul class="nav nav-tabs mt-5" id="detailTabs">
      <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-specs">Thông số</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-reviews">Đánh giá (${p.reviews})</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-related">Liên quan</a></li>
    </ul>
    <div class="tab-content p-3 border border-top-0 rounded-bottom">
      <div class="tab-pane fade show active" id="tab-specs">
        <table class="table table-striped">
          <tr><th>Màn hình</th><td>${p.specs.screen}</td></tr>
          <tr><th>CPU</th><td>${p.specs.cpu}</td></tr>
          <tr><th>RAM</th><td>${p.specs.ram}</td></tr>
          <tr><th>Bộ nhớ</th><td>${p.specs.storage}</td></tr>
          <tr><th>Camera</th><td>${p.specs.camera}</td></tr>
          <tr><th>Pin</th><td>${p.specs.battery}</td></tr>
          <tr><th>Hệ điều hành</th><td>${p.specs.os}</td></tr>
        </table>
      </div>
      <div class="tab-pane fade" id="tab-reviews">
        <div class="row">
          <div class="col-md-4 text-center border-end">
            <h1 class="text-warning">${p.rating}.0</h1>
            <div class="text-warning fs-4">${"★".repeat(p.rating)}</div>
            <div class="text-muted">${p.reviews} đánh giá</div>
          </div>
          <div class="col-md-8">
            <h6>Viết đánh giá</h6>
            <div class="mb-2" id="ratingInput">${[5, 4, 3, 2, 1].map((n) => `<i class="bi bi-star fs-4 text-warning rate-star" data-val="${n}" onclick="setRating(${n})" style="cursor:pointer"></i>`).join("")}</div>
            <textarea class="form-control mb-2" id="reviewText" rows="3" placeholder="Nhận xét..."></textarea>
            <button class="btn btn-warning" onclick="submitReview(${p.id})">Gửi đánh giá</button>
            <div id="reviewList" class="mt-3"></div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="tab-related">
        <div class="row g-3">
          ${products
            .filter((x) => x.category === p.category && x.id !== p.id)
            .slice(0, 4)
            .map(
              (x) => `
            <div class="col-6 col-md-3">
              <a href="${typeof getRelativePath === "function" ? getRelativePath("product-detail.html?id=" + x.id) : "product-detail.html?id=" + x.id}" class="text-decoration-none">
                <div class="p-2 border rounded text-center h-100 bg-card">
                  <img src="${x.images[0]}" class="img-fluid rounded mb-2" alt="${x.name}" onerror="handleImgError(this, '${x.category}', '${x.name.replace(/'/g, "\\'")}')" style="height:120px;object-fit:cover;">
                  <div class="small fw-semibold text-truncate">${x.name}</div>
                  <div class="text-warning fw-bold small">${formatPrice(x.price)}</div>
                </div>
              </a>
            </div>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  window.selectVariant = function (btn, v) {
    selectedVariant = v;
    document
      .querySelectorAll(".variant-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  };
  window.changeQty = function (d) {
    qty = Math.max(1, qty + d);
    document.getElementById("qtyInput").value = qty;
  };
  window.doAdd = function (buyNow) {
    addToCart(p.id, selectedVariant, qty);
    const cartUrl = typeof getRelativePath === "function" ? getRelativePath("cart.html") : "cart.html";
    if (buyNow) setTimeout(() => (location.href = cartUrl), 300);
  };
  window.setRating = function (n) {
    document.querySelectorAll(".rate-star").forEach((s, i) => {
      s.className =
        i >= 5 - n
          ? "bi bi-star-fill fs-4 text-warning rate-star"
          : "bi bi-star fs-4 text-warning rate-star";
    });
    window._rating = n;
  };
  window.submitReview = function (pid) {
    const text = document.getElementById("reviewText").value.trim();
    if (!text) return showToast("Vui lòng nhập nhận xét", "warning");
    const reviews = JSON.parse(
      localStorage.getItem("techzone-reviews-" + pid) || "[]",
    );
    const user = getCurrentUser();
    reviews.unshift({
      name: user ? user.name : "Khách",
      rating: window._rating || 5,
      text,
      date: new Date().toLocaleDateString("vi-VN"),
    });
    localStorage.setItem("techzone-reviews-" + pid, JSON.stringify(reviews));
    document.getElementById("reviewText").value = "";
    renderReviews(pid);
    showToast("Cảm ơn đánh giá của bạn!", "success");
  };
  function renderReviews(pid) {
    const reviews = JSON.parse(
      localStorage.getItem("techzone-reviews-" + pid) || "[]",
    );
    const el = document.getElementById("reviewList");
    if (!reviews.length) {
      el.innerHTML = '<p class="text-muted small">Chưa có đánh giá nào.</p>';
      return;
    }
    el.innerHTML = reviews
      .map(
        (r) => `
      <div class="border-bottom pb-2 mb-2">
        <div class="d-flex justify-content-between"><strong>${r.name}</strong><small class="text-muted">${r.date}</small></div>
        <div class="text-warning small">${"★".repeat(r.rating)}</div>
        <div class="small">${r.text}</div>
      </div>`,
      )
      .join("");
  }
  renderReviews(p.id);
});
