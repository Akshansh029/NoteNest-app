// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2196f3",
        seconday: "EF863E",
        darkBg: "#070F2B",
        darkNav: "#1B1A55",
      },
      boxShadow: {
        custom: "0px 0px 2px 2px rgba(153,153,153,1)",
      },
    },
  },
  plugins: [],
};
