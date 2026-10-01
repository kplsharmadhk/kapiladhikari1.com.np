const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  loginMessage.textContent =
    "Admin authentication will be connected in the next step.";
});
