/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      "stone": "#a8a29e",
      "teal": {
        50: "#f0fdfa",
        100: "#d1fae5",
        200: "#a7f3d0",
        900: "#134e4a"
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
