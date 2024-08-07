/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kurale', 'sans-serif'],
        serif: ['Chakra Petch', 'serif'],
      },
      colors: {
        'custom-blue': '#1DA1F2',
      },
    },
  },
  plugins: [],
}
