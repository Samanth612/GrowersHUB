// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00701C",
        secondary: "#212529",
        teritary: "#808080",
        premiumgray: "#F3F3F3",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"], // Register "Jost" as a font option
      },
    },
  },
  plugins: [],
};
