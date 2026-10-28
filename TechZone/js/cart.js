function getCart() {
  return JSON.parse(localStorage.getItem("techzone-cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("techzone-cart", JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, variant = "Mặc định", qty = 1) {
  const p = getProductById(productId);
  if (!p) return;
  const cart = getCart();
  const existing = cart.find(
    (i) => i.id === productId && i.variant === variant,
  );
  if (existing) existing.qty += qty;
  else
    cart.push({
      id: productId,
      name: p.name,
      price: p.price,
      image: p.images[0],
      variant,
      qty,
    });
  saveCart(cart);
  showToast(`Đã thêm "${p.name}" vào giỏ hàng!`, "success");
}
function removeFromCart(productId, variant) {
  saveCart(
    getCart().filter((i) => !(i.id === productId && i.variant === variant)),
  );
}
function updateQty(productId, variant, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId && i.variant === variant);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}
function getCartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}
function getCartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}
function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach((el) => {
    const c = getCartCount();
    el.textContent = c;
    el.style.display = c > 0 ? "inline-block" : "none";
  });
}

const COUPONS = {
  TECH10: { type: "percent", value: 10, label: "Giảm 10%" },
  TECH20: { type: "percent", value: 20, label: "Giảm 20%" },
  FREESHIP: { type: "ship", value: 0, label: "Miễn phí ship" },
};

function applyCoupon(code) {
  const c = COUPONS[code.toUpperCase()];
  if (!c) return { success: false, message: "Mã không hợp lệ!" };
  localStorage.setItem("techzone-coupon", code.toUpperCase());
  return {
    success: true,
    coupon: c,
    message: `Áp dụng ${c.label} thành công!`,
  };
}
