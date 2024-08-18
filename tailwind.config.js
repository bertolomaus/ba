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
    extend: {
      primary: {
        DEFAULT: '#00112f',
        light: '#192843',
        dark: '#000b20'
      },
      secondary: {
        DEFAULT: '#eb4747'
      },
      highlight: {
        DEFAULT: '#ffd824'
      },
      muted: {
        DEFAULT: '#7f8897'
      },
      inverted: {
        DEFAULT: '#e5e7ea',
        primary: '#e5e7ea',
        secondary: '#e5e7ea',
        highlight: '#ffffff',
        text: '#cccfd5',
        muted: '#192843',
        mutedSecondary: '#ef6b6b'
      },
      success: {
        DEFAULT: '#33ff88'
      },
      error: {
        DEFAULT: '#eb4747'
      },
      warning: {
        DEFAULT: '#ffd824'
      }
    }
  },
  plugins: [],
};
