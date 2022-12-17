/** @type {import('tailwindcss').Config} */
const createTransformer = require("tailwind-group-variant");

module.exports = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    transform: createTransformer(),
  },
  theme: {
    extend: {},
    screens: {
      sm: "700px",
      md: "850px",
      lg: "1300px",
      xl: "1800px",
    },
  },
  plugins: [require("daisyui")],
};
