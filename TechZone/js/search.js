/* ==========================================================
   TechZone - Global Search (realtime + suggestions)
   Dùng chung cho mọi trang có #searchInput + #searchSuggestions
   ========================================================== */

(function () {
  let activeIndex = -1;
  let currentResults = [];

  function normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
      .replace(/đ/g, "d");
  }

  function highlight(text, keyword) {
    if (!keyword) return text;
    const re = new RegExp(
      `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    return text.replace(re, '<mark class="bg-warning px-0">$1</mark>');
  }

  function doSearch(keyword) {
    const q = normalize(keyword.trim());
    if (!q) return [];

    return products
      .map((p) => {
        const nameN = normalize(p.name);
        const brandN = normalize(getBrandName(p.brand));
        const catN = normalize(
          (categories.find((c) => c.id === p.category) || {}).name || "",
        );
        let score = 0;
        if (nameN.includes(q)) score += 10;
        if (nameN.startsWith(q)) score += 5;
        if (brandN.includes(q)) score += 4;
        if (catN.includes(q)) score += 2;
        return { product: p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.product);
  }

  function renderSuggestions(results, keyword) {
    const box = document.getElementById("searchSuggestions");
    if (!box) return;

    if (!results.length) {
      box.innerHTML = `
        <div class="p-3 text-center text-muted small">
          <i class="bi bi-search"></i> Không tìm thấy kết quả cho "<strong>${keyword}</strong>"
        </div>`;
      box.style.display = "block";
      return;
    }

    box.innerHTML =
      results
        .map(
          (p, i) => `
      <a href="product-detail.html?id=${p.id}"
         class="search-suggest-item d-flex align-items-center gap-2 p-2 text-decoration-none"
         data-index="${i}">
        <img src="${p.images[0]}" width="44" height="44" class="rounded"
             style="object-fit:cover;flex-shrink:0">
        <div class="flex-grow-1 min-w-0">
          <div class="fw-semibold small text-truncate">${highlight(p.name, keyword)}</div>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${getBrandName(p.brand)}</small>
            <small class="text-danger fw-bold">${formatPrice(p.price)}</small>
          </div>
        </div>
      </a>`,
        )
        .join("") +
      `
      <div class="border-top p-2 text-center">
        <a href="products.html?q=${encodeURIComponent(keyword)}"
           class="small fw-bold text-warning text-decoration-none">
          Xem tất cả kết quả cho "${keyword}" →
        </a>
      </div>`;

    box.style.display = "block";
    currentResults = results;
    activeIndex = -1;
  }

  function setActive(items) {
    items.forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
      el.style.background = i === activeIndex ? "rgba(245,158,11,.15)" : "";
    });
  }

  function initSearch() {
    const input = document.getElementById("searchInput");
    const box = document.getElementById("searchSuggestions");
    if (!input || !box) return;

    let debounce;
    input.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const kw = input.value.trim();
        if (!kw) {
          box.style.display = "none";
          currentResults = [];
          return;
        }
        const results = doSearch(kw);
        renderSuggestions(results, kw);
      }, 180);
    });

    input.addEventListener("focus", () => {
      if (input.value.trim()) {
        const results = doSearch(input.value.trim());
        if (results.length) renderSuggestions(results, input.value.trim());
      }
    });

    input.addEventListener("keydown", (e) => {
      const items = box.querySelectorAll(".search-suggest-item");
      if (!items.length) {
        if (e.key === "Enter") {
          location.href = "products.html?q=" + encodeURIComponent(input.value);
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        setActive(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        setActive(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && currentResults[activeIndex]) {
          location.href =
            "product-detail.html?id=" + currentResults[activeIndex].id;
        } else {
          location.href = "products.html?q=" + encodeURIComponent(input.value);
        }
      } else if (e.key === "Escape") {
        box.style.display = "none";
      }
    });

    // Click ngoài → đóng
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !box.contains(e.target)) {
        box.style.display = "none";
      }
    });
  }

  // Gọi sau khi DOM + các script khác đã load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }

  // Expose để trang products.html có thể dùng lại
  window.TechZoneSearch = { doSearch, normalize, highlight };
})();
