/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: ["prettier-plugin-tailwindcss", require("@tailwindcss/forms")],
};
