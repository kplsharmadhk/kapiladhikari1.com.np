const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (!loginForm) {
  console.warn("Admin login form not found on this page.");
} else {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (loginMessage) {
      loginMessage.textContent =
        "Admin authentication is not configured yet. Please contact the site owner.";
    }
  });
}
