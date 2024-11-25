export function isAuthenticated() {
  return !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
}

export function checkAuth() {
  if (!isAuthenticated()) {
    localStorage.setItem("redirectAfterLogin", window.location.href)

    window.location.href = "login.html"
  }
}
