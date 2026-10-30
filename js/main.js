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
            ? "#f59e0b"
            : type === "error"
              ? "#ef4444"
              : type === "warning"
                ? "#f97316"
                : "#3b82f6",
        color: "#000",
        fontWeight: "600",
        borderRadius: "10px",
      },
    }).showToast();
  } else alert(msg);
}

// Back to top
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

// Search realtime
function initSearch() {
  const input = document.getElementById("searchInput");
  const box = document.getElementById("searchSuggestions");
  if (!input || !box) return;
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
      box.innerHTML = '<div class="p-2 text-muted">Không có kết quả</div>';
      box.style.display = "block";
      return;
    }
    box.innerHTML = results
      .map(
        (p) => `
      <a href="product-detail.html?id=${p.id}" class="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark search-suggest-item">
        <img src="${p.images[0]}" width="40" height="40" class="rounded" style="object-fit:cover">
        <div class="flex-grow-1">
          <div class="fw-semibold small">${p.name}</div>
          <div class="text-warning fw-bold small">${formatPrice(p.price)}</div>
        </div>
      </a>`,
      )
      .join("");
    box.style.display = "block";
  });
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !box.contains(e.target))
      box.style.display = "none";
  });
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
      location.href = "products.html?q=" + encodeURIComponent(input.value);
  });
}

// Recently viewed
function addRecentlyViewed(id) {
  let arr = JSON.parse(localStorage.getItem("techzone-recently") || "[]");
  arr = arr.filter((x) => x !== id);
  arr.unshift(id);
  arr = arr.slice(0, 8);
  localStorage.setItem("techzone-recently", JSON.stringify(arr));
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initBackTop();
  initSearch();
  if (typeof renderAuthNav === "function") renderAuthNav();
  if (typeof updateCartBadge === "function") updateCartBadge();
  if (typeof updateWishlistBadge === "function") updateWishlistBadge();
  if (typeof updateCompareBadge === "function") updateCompareBadge();
  if (typeof AOS !== "undefined") AOS.init({ duration: 600, once: true });
});
