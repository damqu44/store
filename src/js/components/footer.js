export function loadFooter() {
  const app = document.getElementById("app")
  const footer = document.createElement("div")
  footer.classList.add(
    "w-full",
    "px-10",
    "mt-10",
    "py-4",
    "flex",
    "justify-center",
    "items-center",
    "shadow-lg",
    "bg-white",
    "dark:bg-[#222222]",
    "border-primary",
    "border-x-0",
    "border-t-0",
    "border-b-2"
  )
  footer.innerHTML = "&copy; Damian Charążka"
  app.appendChild(footer)
}
