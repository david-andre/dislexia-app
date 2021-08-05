const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
      },
    },
    fontFamily: {
      'luckiest-guy': ['Luckiest Guy', 'sans-serif']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
