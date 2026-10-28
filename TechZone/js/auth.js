function getUsers() {
  return JSON.parse(localStorage.getItem("techzone-users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("techzone-users", JSON.stringify(users));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("techzone-current-user") || "null");
}
function setCurrentUser(user) {
  if (user) localStorage.setItem("techzone-current-user", JSON.stringify(user));
  else localStorage.removeItem("techzone-current-user");
}

function registerUser(name, email, phone, password) {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email đã được đăng ký!" };
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  setCurrentUser({ id: newUser.id, name, email, phone });
  return { success: true, message: "Đăng ký thành công!" };
}

function loginUser(email, password) {
  const users = getUsers();
  const u = users.find((u) => u.email === email && u.password === password);
  if (!u) return { success: false, message: "Email hoặc mật khẩu không đúng!" };
  setCurrentUser({ id: u.id, name: u.name, email: u.email, phone: u.phone });
  return { success: true, message: "Đăng nhập thành công!" };
}

function logoutUser() {
  setCurrentUser(null);
  if (typeof showToast === "function") showToast("Đã đăng xuất", "info");
  setTimeout(() => (location.href = "index.html"), 500);
}

function renderAuthNav() {
  const user = getCurrentUser();
  const container = document.getElementById("auth-area");
  if (!container) return;
  if (user) {
    container.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-warning dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle"></i> ${user.name.split(" ").pop()}
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow">
          <li><a class="dropdown-item" href="account.html"><i class="bi bi-person"></i> Tài khoản</a></li>
          <li><a class="dropdown-item" href="account.html#orders"><i class="bi bi-box-seam"></i> Đơn hàng</a></li>
          <li><a class="dropdown-item" href="wishlist.html"><i class="bi bi-heart"></i> Yêu thích</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="logoutUser();return false;"><i class="bi bi-box-arrow-right"></i> Đăng xuất</a></li>
        </ul>
      </div>`;
  } else {
    container.innerHTML = `
      <a href="login.html" class="btn btn-warning fw-bold"><i class="bi bi-person"></i> Đăng nhập</a>`;
  }
}
