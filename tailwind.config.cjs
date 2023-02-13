/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["General\\ Sans", "Arial", "sans-serif"],
      mono: ["JetBrains\\ Mono"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
