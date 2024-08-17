/** @type {import('tailwindcss').Config} */
export default {
  content: ["~/{assets,components,composables,content,pages}/**/*.{json,ts,vue}"],
  theme: {
    container: {
      screens: {
        sm: '480px',
        md: '800px',
        lg: '1280px',
        xl: '2000px',
        xl: '3000px',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Mono', 'serif'],
    },
  },
  plugins: [],
}

