/** @type {import('tailwindcss').Config} */

module.exports = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
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
