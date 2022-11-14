/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#AAAAAA",
        dark: "#212529",
      },
    },
  },
  plugins: [],
};
