// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2196f3",
        primaryDark: "#1a79c4",
        seconday: "EF863E",
        darkBg: "#191919",
        darkNav: "#202020",
        darkTextColor: "#D3D3D3",
      },
      boxShadow: {
        "custom-light": "3px 5px 5px -4px rgba(0,0,0,0.75)",
        "custom-dark": "0 2px 4px rgba(0, 0, 0, 0.9)",
      },
      height: {
        "calc-100-minus-64": "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
