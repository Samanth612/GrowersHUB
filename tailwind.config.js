// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00701C",
        premiumgreen: "#00701C11",
        secondary: "#212529",
        teritary: "#808080",
        premiumgray: "#F3F3F3",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"], // Register "Jost" as a font option
      },
      screens: {
        xl: "1490px",
        laptopView: "1370px",
        laptopviewxll: "1190px",
        xll: "1180px",
        tabxl: "1070px",
        tabxll: "1000px",
        tabmd: "800px",
        tabsm: "680px",
      },
    },
  },
  plugins: [],
};
