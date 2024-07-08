/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      backgroundImage: {
        'back-color': 'linear-gradient(to bottom, #B2ACE2, #474A76)',
      }
    }
  },
  plugins: [],
}

