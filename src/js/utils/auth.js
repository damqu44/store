export function isAuthenticated() {
  const cookies = document.cookie.split("; ")
  const tokenCookie = cookies.find((row) => row.startsWith("authToken"))
  console.log(document.cookie)

  return tokenCookie !== undefined
}

export function checkAuth() {
  if (!isAuthenticated()) {
    localStorage.setItem("redirectAfterLogin", window.location.href)

    // window.location.href = "/login.html"
  }
}
