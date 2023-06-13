/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        hbeat: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },

      animation: {
        hbeat: "hbeat 1s ease-in-out ",
      },
    },
    screens: {
      "2xs": "120px",
      xs: "360px",
      sm: "768px", // => @media (min-width: 640px) { ... }
      md: "1024px", // => @media (min-width: 1024px) { ... }
      lg: "1200px", // => @media (min-width: 1280px) { ... }
      xl: "1440px", // => @media (min-width: 1536px) { ... }
    },
    colors: {
      lime: "#3BB143",
      white: "#fff",
      red: "#FF0000",
      skyblue: "#f5f7f7",
      orange: "#E34A27",
      light_gray: "#d5d0d0",
      black: "#000000",
      secondary: "#666666",
      light_green: "#c4fbc4",
      yellow_rating: "#f4cb45",
      lightgray : "#545454",
      darkgray: "#3f3f3f",
      candy: "#D21404",
      lava_grey: "#989898",
      lightest_grey : "#e2e2e2",
      light_gray: "#313131",
      gryColour: "#e2e8f0",
      green_light : "#a3183d",
      customGreen: 'rgb(12, 166, 31)',
      customBlack: 'rgb(28, 28, 28)',
      lightGrays: 'rgb(41, 61, 41)',
    },
    borderColor: {
      default: "#CDCDCE",
      green: "#7FFF00",
      light_gray: "#D3D3D3",
      lime: "#3BB143",
      light_green : "#8AFF8A"

    },
    fontFamily: { 
      sans: ["Roboto", "sans-serif"] ,
      okra : ['Okra-Medium', 'sans-serif']
    },
   
  },
  plugins: [],
};
