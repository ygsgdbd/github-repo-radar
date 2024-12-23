/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./contents/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./options/**/*.{ts,tsx}",
    "./popup/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

