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
        custom: "0px 0px 2px 2px rgba(153,153,153,1)",
      },
      height: {
        "calc-100-minus-64": "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
