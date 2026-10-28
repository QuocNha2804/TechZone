// compare.js
function getCompare() {
  return JSON.parse(localStorage.getItem("techzone-compare") || "[]");
}
function saveCompare(a) {
  localStorage.setItem("techzone-compare", JSON.stringify(a));
  updateCompareBadge();
}
function toggleCompare(id) {
  let arr = getCompare();
  if (arr.includes(id)) {
    arr = arr.filter((x) => x !== id);
    showToast("Đã bỏ so sánh", "info");
  } else {
    if (arr.length >= 4) {
      showToast("Chỉ so sánh tối đa 4 sản phẩm", "warning");
      return;
    }
    arr.push(id);
    showToast("Đã thêm vào so sánh", "success");
  }
  saveCompare(arr);
}
function updateCompareBadge() {
  const c = getCompare().length;
  document.querySelectorAll(".compare-badge").forEach((el) => {
    el.textContent = c;
    el.style.display = c > 0 ? "inline-block" : "none";
  });
}
