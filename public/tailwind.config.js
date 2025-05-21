/** @type {import('tailwindcss').Config} */
@import "daisyui/src/index.css";
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui")],
  }