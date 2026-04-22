/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rpi: {
          blue: '#1e40af',
          gray: '#64748b',
        }
      }
    },
  },
  plugins: [],
}
