export function isAuthenticated() {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc[key] = value
      return acc
    }, {})

  console.log("Ciasteczka:", cookies)
  console.log("authToken:", cookies.authToken)

  return cookies.authToken !== undefined && cookies.authToken !== ""
}

export function checkAuth() {
  if (!isAuthenticated()) {
    const currentUrl = window.location.href
    if (currentUrl) {
      localStorage.setItem("redirectAfterLogin", currentUrl)
    }
    // window.location.href = "/login.html";
  }
}

export function redirectAfterLogin() {
  const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/"
  localStorage.removeItem("redirectAfterLogin")
  window.location.href = redirectUrl
}
