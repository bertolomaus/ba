/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "~/{assets,components,composables,content,pages}/*.{html,js,json,ts,jsx,tsx,vue}",
  ],
  theme: {
    container: {
      screens: {
        sm: "480px",
        md: "800px",
        lg: "1280px",
        xl: "2000px",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto Mono", "serif"],
    },
  },
  plugins: [],
};
