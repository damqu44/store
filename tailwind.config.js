module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '#1ABC1C',
        primary_dark: '#0e9410',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
