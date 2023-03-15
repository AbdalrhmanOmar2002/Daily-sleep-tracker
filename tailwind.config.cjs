/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#5696f6",
        tow: "#eef4fe",
        three: "#f3f6fa",
        fore: "#97a1ab",
      },
      dropShadow: {
        "3xl": "rgb(218, 230, 247) 6.4px 6.4px",
        "4xl": "rgb(0, 0, 0) 6.4px 6.4px 0.2px",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
