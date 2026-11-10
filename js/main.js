/* ==========================================================
   TechZone - Main JavaScript
   Hỗ trợ toàn trang: Thông báo, Tìm kiếm, Theme, Ảnh, QuickView,
   Mobile Bottom Nav, Điều hướng relative
   ========================================================== */

// 1. Global Image Error Fallback - Chống lỗi load ảnh 100%
window.addEventListener(
  "error",
  function (e) {
    if (e.target && e.target.tagName === "IMG") {
      const img = e.target;
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "true";
      const alt = (img.getAttribute("alt") || "TechZone").trim();

      // Kiểm tra nếu là logo thương hiệu trong box thương hiệu
      const isBrandBox = img.closest(".brand-logo-box, .logo-wrap, .brand-logo-big");
      const matchedBrand =
        typeof brands !== "undefined"
          ? brands.find(
              (b) =>
                b.name.toLowerCase() === alt.toLowerCase() ||
                b.id.toLowerCase() === alt.toLowerCase()
            )
          : null;

      if (isBrandBox || matchedBrand) {
        const brandName = (matchedBrand ? matchedBrand.name : alt)
          .replace(/[<>"']/g, "");
        const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="100%" height="100%"><rect width="200" height="60" fill="#ffffff" rx="8"/><text x="100" y="38" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="24" letter-spacing="2" fill="#1e293b" text-anchor="middle">${brandName}</text></svg>`;
        try {
          img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(brandSvg)));
        } catch (_) {
          img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(brandSvg);
        }
        return;
      }

      if (typeof getProductSvgPlaceholder === "function") {
        const cat =
          typeof detectCategoryByName === "function"
            ? detectCategoryByName(alt)
            : "phone";
        img.src = getProductSvgPlaceholder(cat, alt);
      } else {
        img.src =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTA1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Y1OWUwYiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VGVjaFpvbmU8L3RleHQ+PC9zdmc+";
      }
    }
  },
  true,
);

// 2. Toast Notifications
function showToast(msg, type = "success") {
  if (typeof Toastify !== "undefined") {
    Toastify({
      text: msg,
      duration: 2500,
      gravity: "top",
      position: "right",
      style: {
        background:
          type === "success"
            ? "linear-gradient(135deg, #f59e0b, #d97706)"
            : type === "error"
              ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : type === "warning"
                ? "linear-gradient(135deg, #f97316, #ea580c)"
                : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        color: "#fff",
        fontWeight: "600",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      },
    }).showToast();
  } else {
    alert(msg);
  }
}

// 3. Back to Top Button
function initBackTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
  });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// 4. Realtime Search (Tự tương thích đường dẫn index.html & html/)
function initSearch() {
  const input = document.getElementById("searchInput");
  const box = document.getElementById("searchSuggestions");
  if (!input || !box) return;

  // Nếu trang đã nạp js/search.js thì để search.js nâng cao xử lý
  if (window.__advancedSearchLoaded) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      box.style.display = "none";
      return;
    }
    const results = products
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 6);
    if (!results.length) {
      box.innerHTML =
        '<div class="p-3 text-muted text-center small"><i class="bi bi-search"></i> Không tìm thấy kết quả</div>';
      box.style.display = "block";
      return;
    }
    box.innerHTML =
      results
        .map((p) => {
          const detailUrl =
            typeof getRelativePath === "function"
              ? getRelativePath("product-detail.html?id=" + p.id)
              : "product-detail.html?id=" + p.id;
          return `
      <a href="${detailUrl}" class="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark search-suggest-item">
        <img src="${p.images[0]}" width="44" height="44" class="rounded" style="object-fit:cover;flex-shrink:0" alt="${p.name}">
        <div class="flex-grow-1 min-w-0">
          <div class="fw-semibold small text-truncate">${p.name}</div>
          <div class="text-warning fw-bold small">${formatPrice(p.price)}</div>
        </div>
      </a>`;
        })
        .join("") +
      `<div class="p-2 border-top text-center"><a href="${typeof getRelativePath === "function" ? getRelativePath("products.html?q=" + encodeURIComponent(q)) : "products.html?q=" + encodeURIComponent(q)}" class="small fw-bold text-warning text-decoration-none">Xem tất cả kết quả →</a></div>`;
    box.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !box.contains(e.target)) {
      box.style.display = "none";
    }
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const q = encodeURIComponent(input.value.trim());
      const target =
        typeof getRelativePath === "function"
          ? getRelativePath("products.html?q=" + q)
          : "products.html?q=" + q;
      location.href = target;
    }
  });
}

// 5. Recently Viewed Products
function addRecentlyViewed(id) {
  let arr = JSON.parse(localStorage.getItem("techzone-recently") || "[]");
  arr = arr.filter((x) => x !== id);
  arr.unshift(id);
  arr = arr.slice(0, 8);
  localStorage.setItem("techzone-recently", JSON.stringify(arr));
}

// 6. Quick View Modal (Xem nhanh sản phẩm hiện đại)
function openQuickView(id) {
  const p = typeof getProductById === "function" ? getProductById(id) : null;
  if (!p) return;

  let modalEl = document.getElementById("quickViewModal");
  if (!modalEl) {
    modalEl = document.createElement("div");
    modalEl.id = "quickViewModal";
    modalEl.className = "modal fade";
    modalEl.tabIndex = -1;
    modalEl.setAttribute("aria-hidden", "true");
    document.body.appendChild(modalEl);
  }

  const detailUrl =
    typeof getRelativePath === "function"
      ? getRelativePath("product-detail.html?id=" + p.id)
      : "product-detail.html?id=" + p.id;

  modalEl.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
        <div class="modal-header border-0 pb-0">
          <span class="badge bg-warning text-dark">${getBrandName(p.brand)}</span>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>
        <div class="modal-body p-4">
          <div class="row g-4 align-items-center">
            <div class="col-md-6 text-center">
              <div class="p-3 bg-body-tertiary rounded-4 mb-2">
                <img id="qvMainImg" src="${p.images[0]}" alt="${p.name}" class="img-fluid rounded" style="max-height: 280px; object-fit: contain;">
              </div>
              <div class="d-flex justify-content-center gap-2">
                ${p.images
                  .map(
                    (img, idx) => `
                  <img src="${img}" class="rounded border p-1" style="width: 50px; height: 50px; object-fit: cover; cursor: pointer; ${idx === 0 ? "border-color: var(--primary) !important;" : ""}" onclick="document.getElementById('qvMainImg').src='${img}'">`,
                  )
                  .join("")}
              </div>
            </div>
            <div class="col-md-6">
              <h4 class="fw-bold mb-2">${p.name}</h4>
              <div class="d-flex align-items-center gap-2 mb-3">
                <div class="text-warning">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div>
                <span class="text-muted small">(${p.reviews} đánh giá | Đã bán ${p.sold})</span>
              </div>
              <div class="p-3 rounded-3 mb-3" style="background: rgba(245, 158, 11, 0.1);">
                <div class="d-flex align-items-baseline gap-2">
                  <span class="fs-4 fw-bold text-danger">${formatPrice(p.price)}</span>
                  ${p.oldPrice ? `<span class="text-muted text-decoration-line-through small">${formatPrice(p.oldPrice)}</span>` : ""}
                  ${p.discount ? `<span class="badge bg-danger">-${p.discount}%</span>` : ""}
                </div>
              </div>
              <div class="mb-3">
                <div class="small fw-semibold mb-1">Thông số nhanh:</div>
                <ul class="list-unstyled small mb-0 text-muted">
                  ${p.specs.screen ? `<li>• Màn hình: ${p.specs.screen}</li>` : ""}
                  ${p.specs.cpu ? `<li>• CPU: ${p.specs.cpu}</li>` : ""}
                  ${p.specs.ram ? `<li>• RAM: ${p.specs.ram} - Ổ cứng: ${p.specs.storage}</li>` : ""}
                </ul>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-warning fw-bold flex-grow-1" onclick="addToCart(${p.id}); bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide();">
                  <i class="bi bi-cart-plus"></i> Thêm giỏ
                </button>
                <a href="${detailUrl}" class="btn btn-outline-dark fw-bold">Chi tiết →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

// 7. Mobile Bottom Navigation Bar (App-like UX cho điện thoại)
function renderMobileBottomNav() {
  if (document.getElementById("mobileBottomNav")) return;
  const isHtml = window.location.pathname.replace(/\\/g, "/").includes("/html/");
  const homeUrl = isHtml ? "../index.html" : "index.html";
  const prodsUrl = isHtml ? "products.html" : "html/products.html";
  const cartUrl = isHtml ? "cart.html" : "html/cart.html";
  const wishUrl = isHtml ? "wishlist.html" : "html/wishlist.html";
  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const accUrl = user
    ? isHtml
      ? "account.html"
      : "html/account.html"
    : isHtml
      ? "login.html"
      : "html/login.html";

  const nav = document.createElement("div");
  nav.id = "mobileBottomNav";
  nav.className = "mobile-bottom-nav d-md-none";
  nav.innerHTML = `
    <a href="${homeUrl}" class="mob-nav-item">
      <i class="bi bi-house"></i>
      <span>Trang chủ</span>
    </a>
    <a href="${prodsUrl}" class="mob-nav-item">
      <i class="bi bi-grid"></i>
      <span>Sản phẩm</span>
    </a>
    <a href="${cartUrl}" class="mob-nav-item position-relative">
      <i class="bi bi-cart3"></i>
      <span>Giỏ hàng</span>
      <span class="badge cart-badge">0</span>
    </a>
    <a href="${wishUrl}" class="mob-nav-item position-relative">
      <i class="bi bi-heart"></i>
      <span>Yêu thích</span>
      <span class="badge wishlist-badge">0</span>
    </a>
    <a href="${accUrl}" class="mob-nav-item">
      <i class="bi bi-person"></i>
      <span>${user ? "Tài khoản" : "Đăng nhập"}</span>
    </a>
  `;
  document.body.appendChild(nav);
}

// 8. Floating Quick Contact / Hotline Button
function renderFloatingContact() {
  if (document.getElementById("floatingContact")) return;
  const div = document.createElement("div");
  div.id = "floatingContact";
  div.className = "floating-contact";
  div.innerHTML = `
    <a href="tel:19001234" class="contact-pill hotline" title="Hotline 1900 1234">
      <i class="bi bi-telephone-fill"></i>
    </a>
    <button class="contact-pill chat" onclick="showToast('Hỗ trợ trực tuyến: 1900 1234 (8:00 - 22:00)', 'info')" title="Chat hỗ trợ">
      <i class="bi bi-chat-dots-fill"></i>
    </button>
  `;
  document.body.appendChild(div);
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  if (typeof initTheme === "function") initTheme();
  initBackTop();
  initSearch();
  renderMobileBottomNav();
  renderFloatingContact();
  if (typeof renderAuthNav === "function") renderAuthNav();
  if (typeof updateCartBadge === "function") updateCartBadge();
  if (typeof updateWishlistBadge === "function") updateWishlistBadge();
  if (typeof updateCompareBadge === "function") updateCompareBadge();
  if (typeof AOS !== "undefined") AOS.init({ duration: 600, once: true });
});
