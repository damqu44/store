export function isAuthenticated() {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=")
    acc[key] = value
    return acc
  }, {})

  return Boolean(cookies.authToken)
}

export function checkAuth() {
  console.log(!isAuthenticated)
  if (!isAuthenticated()) {
    localStorage.setItem("redirectAfterLogin", window.location.href)

    // window.location.href = "/login.html"
  }
}
