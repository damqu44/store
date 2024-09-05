module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,html,css}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '#1ABC1C',
        primary_dark: '#0e9410',
        background_light: '#f7f7f7',
        background_dark: '#222222',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
