/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0f",
        night: "#11111a",
        ember: "#f5b942",
        emberSoft: "#f6c96b",
        parchment: "#f4efe6",
        stone: "#9a9488",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        hebrew: ['"Frank Ruhl Libre"', "serif"],
        sans: ['ui-sans-serif', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
