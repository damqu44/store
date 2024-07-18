export function loadHeader() {
  const app = document.getElementById('app')
  const header = document.createElement('div')
  header.classList.add(
    'w-full',
    'px-10',
    'py-3',
    'flex',
    'justify-between',
    'bg-white',
    'dark:bg-[#222222]'
  )
  header.innerHTML = `
      <div class="font-bold text-2xl text-primary">
        <a href="/">CATERING</a>
      </div>
      <div class="hidden sm:flex w-[25%]">
        <form id="search-form" class="w-full flex justify-center items-center">
          <input type="text" placeholder="czego szukasz?" class="bg-transparent rounded-l-md border border-[#6d6d6d] px-3 py-1 w-full text-sm h-[35px] outline-none" />
          <button class="bg-primary hover:bg-primary_dark rounded-r-md border-l-0 h-full px-3 text-md text-white outline-none">
            SZUKAJ
          </button>
        </form>
      </div>
      <div class="flex justify-center items-center">
        <div class="pr-6 cursor-pointer hover:text-primary transition-colors">KONTAKT</div>
        <div class="pr-6"><a href="/cart.html"><i class="fas fa-shopping-cart cursor-pointer hover:text-primary transition-colors"></i></a></div>
        <div id="account-button" class="relative">
          <i class="fas fa-user cursor-pointer hover:text-primary transition-colors"></i>
          <div id="account-menu" class="hidden absolute right-0 top-0 w-[250px] p-5 mt-8 bg-[#222222] border border-[#808080] z-10">
            <a href="/login.html">
              <button class="text-white bg-primary hover:bg-primary_dark text-xl py-2 mt-3 w-full">
                ZALOGUJ SIĘ
              </button>
            </a>
            <a href="/register.html">
              <button class="text-white bg-primary hover:bg-primary_dark text-xl py-2 mt-3 w-full">
                ZAŁÓŻ KONTO
              </button>
            </a>
            <a href="/account.html">
              <button class="text-white bg-primary hover:bg-primary_dark text-xl py-2 mt-3 w-full">
                KONTO
              </button>
            </a>
          </div>
        </div>
        </div>
    `
  app.prepend(header)

  const accountButton = document.getElementById('account-button')
  accountButton.addEventListener('click', () => {
    const accountMenu = document.getElementById('account-menu')
    accountMenu.classList.toggle('hidden')
  })
}

{
  /* <i class="fa-solid fa-moon"></i>
<i class="fa-regular fa-moon"></i> */
}
