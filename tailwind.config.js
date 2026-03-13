/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lime: "#CAFF00",
        charcoal: "#0D0D0D",
        offwhite: "#F0EDE6",
        dim: "#1A1A1A",
        muted: "#555555",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        dm: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}