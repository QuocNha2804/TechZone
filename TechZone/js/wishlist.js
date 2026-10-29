// wishlist.js
function getWishlist() {
  return JSON.parse(localStorage.getItem("techzone-wishlist") || "[]");
}
function saveWishlist(a) {
  localStorage.setItem("techzone-wishlist", JSON.stringify(a));
  updateWishlistBadge();
}
function toggleWishlist(id) {
  let arr = getWishlist();
  if (arr.includes(id)) {
    arr = arr.filter((x) => x !== id);
    showToast("Đã xóa khỏi yêu thích", "info");
  } else {
    arr.push(id);
    showToast("Đã thêm vào yêu thích ❤️", "success");
  }
  saveWishlist(arr);
}
function updateWishlistBadge() {
  const c = getWishlist().length;
  document.querySelectorAll(".wishlist-badge").forEach((el) => {
    el.textContent = c;
    el.style.display = c > 0 ? "inline-block" : "none";
  });
}
