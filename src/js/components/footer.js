export function loadFooter() {
  const app = document.getElementById('app')
  const footer = document.createElement('div')
  footer.classList.add(
    'w-full',
    'px-10',
    'mt-10',
    'py-4',
    'flex',
    'justify-center',
    'items-center',
    'shadow-lg',
    'bg-white',
    'dark:bg-[#222222]'
  )
  footer.innerHTML = '&copy; Damian Charążka'
  app.appendChild(footer)
}
