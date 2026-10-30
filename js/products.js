let state = {
  category: "",
  brands: [],
  priceMin: 0,
  priceMax: 60000000,
  ram: "",
  cpu: "",
  storage: "",
  rating: 0,
  sort: "popular",
  page: 1,
  perPage: 8,
  view: "grid",
  q: "",
};

function renderProducts() {
  let list = [...products];
  if (state.category) list = list.filter((p) => p.category === state.category);
  if (state.brands.length)
    list = list.filter((p) => state.brands.includes(p.brand));
  list = list.filter(
    (p) => p.price >= state.priceMin && p.price <= state.priceMax,
  );
  if (state.ram) list = list.filter((p) => p.specs.ram === state.ram);
  if (state.cpu)
    list = list.filter((p) =>
      p.specs.cpu.toLowerCase().includes(state.cpu.toLowerCase()),
    );
  if (state.storage)
    list = list.filter((p) => p.specs.storage.includes(state.storage));
  if (state.rating) list = list.filter((p) => p.rating >= state.rating);
  if (state.q)
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(state.q.toLowerCase()) ||
        getBrandName(p.brand).toLowerCase().includes(state.q.toLowerCase()),
    );

  switch (state.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      list.sort((a, b) => b.id - a.id);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      list.sort((a, b) => b.discount - a.discount);
      break;
    default:
      list.sort((a, b) => b.sold - a.sold);
  }

  const total = list.length;
  const totalPages = Math.ceil(total / state.perPage);
  const start = (state.page - 1) * state.perPage;
  const pageItems = list.slice(start, start + state.perPage);

  const grid = document.getElementById("productGrid");
  if (!grid) return;

  if (!pageItems.length) {
    grid.innerHTML =
      '<div class="col-12 text-center py-5"><i class="bi bi-emoji-frown fs-1 text-muted"></i><p class="mt-3">Không tìm thấy sản phẩm phù hợp</p></div>';
  } else {
    grid.innerHTML = pageItems.map((p) => productCardHTML(p)).join("");
  }
  renderPagination(totalPages);
  renderFilterChips();
  document.getElementById("resultCount").textContent = `${total} sản phẩm`;
}

function productCardHTML(p) {
  return `
    <div class="col-lg-3 col-md-4 col-6">
      <div class="product-card h-100">
        <div class="product-thumb">
          ${p.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">-${p.discount}%</span>` : ""}
          ${p.isNew ? `<span class="badge bg-success position-absolute top-0 end-0 m-2">Mới</span>` : ""}
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          <div class="product-actions">
            <button onclick="toggleWishlist(${p.id})" title="Yêu thích"><i class="bi bi-heart"></i></button>
            <button onclick="toggleCompare(${p.id})" title="So sánh"><i class="bi bi-arrow-left-right"></i></button>
            <a href="product-detail.html?id=${p.id}" title="Xem"><i class="bi bi-eye"></i></a>
          </div>
        </div>
        <div class="p-3">
          <div class="text-muted small">${getBrandName(p.brand)}</div>
          <a href="product-detail.html?id=${p.id}" class="text-decoration-none">
            <h6 class="product-name">${p.name}</h6>
          </a>
          <div class="text-warning small mb-1">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)} <span class="text-muted">(${p.reviews})</span></div>
          <div class="d-flex align-items-center gap-2">
            <span class="price">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
          </div>
          <button class="btn btn-warning btn-sm w-100 mt-2 fw-bold" onclick="addToCart(${p.id})">
            <i class="bi bi-cart-plus"></i> Thêm giỏ
          </button>
        </div>
      </div>
    </div>`;
}

function renderPagination(totalPages) {
  const el = document.getElementById("pagination");
  if (!el) return;
  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === state.page ? "active" : ""}"><a class="page-link" href="#" onclick="gotoPage(${i});return false;">${i}</a></li>`;
  }
  el.innerHTML = html;
}
function gotoPage(i) {
  state.page = i;
  renderProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderFilterChips() {
  const el = document.getElementById("filterChips");
  if (!el) return;
  const chips = [];
  if (state.category)
    chips.push({
      label: categories.find((c) => c.id === state.category)?.name,
      clear: () => (state.category = ""),
    });
  state.brands.forEach((b) =>
    chips.push({
      label: getBrandName(b),
      clear: () => (state.brands = state.brands.filter((x) => x !== b)),
    }),
  );
  if (state.q)
    chips.push({ label: `"${state.q}"`, clear: () => (state.q = "") });
  if (state.rating)
    chips.push({
      label: `${state.rating}★ trở lên`,
      clear: () => (state.rating = 0),
    });
  el.innerHTML = chips.length
    ? chips
        .map(
          (c, i) =>
            `<span class="filter-chip">${c.label} <i class="bi bi-x" onclick="clearChip(${i})"></i></span>`,
        )
        .join("") +
      `<button class="btn btn-sm btn-link text-danger" onclick="clearAllFilters()">Xóa tất cả</button>`
    : "";
  window._chips = chips;
}
function clearChip(i) {
  window._chips[i].clear();
  state.page = 1;
  renderProducts();
  syncFilterUI();
}
function clearAllFilters() {
  state = {
    ...state,
    category: "",
    brands: [],
    priceMin: 0,
    priceMax: 60000000,
    ram: "",
    cpu: "",
    storage: "",
    rating: 0,
    q: "",
    page: 1,
  };
  renderProducts();
  syncFilterUI();
}
function syncFilterUI() {
  document
    .querySelectorAll(".filter-brand")
    .forEach((cb) => (cb.checked = state.brands.includes(cb.value)));
  document
    .querySelectorAll('input[name="cat"]')
    .forEach((r) => (r.checked = r.value === state.category));
  const pmin = document.getElementById("priceMin"),
    pmax = document.getElementById("priceMax");
  if (pmin) pmin.value = state.priceMin;
  if (pmax) pmax.value = state.priceMax;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("productGrid")) return;
  const params = new URLSearchParams(location.search);
  if (params.get("cat")) state.category = params.get("cat");
  if (params.get("q")) state.q = params.get("q");

  // Filter events
  document.querySelectorAll('input[name="cat"]').forEach((r) =>
    r.addEventListener("change", (e) => {
      state.category = e.target.value;
      state.page = 1;
      renderProducts();
    }),
  );
  document.querySelectorAll(".filter-brand").forEach((cb) =>
    cb.addEventListener("change", () => {
      state.brands = [
        ...document.querySelectorAll(".filter-brand:checked"),
      ].map((x) => x.value);
      state.page = 1;
      renderProducts();
    }),
  );
  document.querySelectorAll(".price-preset").forEach((b) =>
    b.addEventListener("click", () => {
      state.priceMin = +b.dataset.min;
      state.priceMax = +b.dataset.max;
      state.page = 1;
      renderProducts();
    }),
  );
  document.querySelectorAll(".filter-ram").forEach((r) =>
    r.addEventListener("change", (e) => {
      state.ram = e.target.value;
      state.page = 1;
      renderProducts();
    }),
  );
  document.querySelectorAll(".filter-storage").forEach((r) =>
    r.addEventListener("change", (e) => {
      state.storage = e.target.value;
      state.page = 1;
      renderProducts();
    }),
  );
  document.querySelectorAll(".filter-rating").forEach((r) =>
    r.addEventListener("change", (e) => {
      state.rating = +e.target.value;
      state.page = 1;
      renderProducts();
    }),
  );
  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });
  document
    .getElementById("searchInputFilter")
    ?.addEventListener("input", (e) => {
      state.q = e.target.value;
      state.page = 1;
      renderProducts();
    });

  renderProducts();
  syncFilterUI();
});
