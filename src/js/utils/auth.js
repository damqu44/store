export function isAuthenticated() {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim()) // Usuń białe znaki
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc[key] = value
      return acc
    }, {})

  return cookies.authToken !== undefined && cookies.authToken !== ""
}

export function checkAuth() {
  if (!isAuthenticated()) {
    const currentUrl = window.location.href
    if (currentUrl) {
      localStorage.setItem("redirectAfterLogin", currentUrl)
    }
    // Przekierowanie do strony logowania
    // window.location.href = "/login.html";
  }
}

export function redirectAfterLogin() {
  const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/"
  localStorage.removeItem("redirectAfterLogin") // Usuń klucz po użyciu
  window.location.href = redirectUrl
}
