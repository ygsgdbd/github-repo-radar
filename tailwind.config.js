/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./contents/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./popup/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

