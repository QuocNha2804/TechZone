(function () {
  const saved = localStorage.getItem("techzone-theme") || "light";
  if (saved === "dark") document.documentElement.classList.add("dark");
})();

function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  localStorage.setItem("techzone-theme", isDark ? "dark" : "light");
  document.querySelectorAll(".theme-toggle i").forEach((icon) => {
    icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
}

function initTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  document.querySelectorAll(".theme-toggle i").forEach((icon) => {
    icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
}
