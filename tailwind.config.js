/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "~/{assets,components,composables,content,pages}/*.{html,js,json,ts,jsx,tsx,vue}",
  ],
  theme: {
    container: {
      screens: {
        'sm': "480px",
        'md': "800px",
        'lg': "1280px",
        'xl': "2000px",
      },
    },
    fontFamily: {
      'sans': ["Roboto", "sans-serif"],
      'serif': ["Roboto Mono", "serif"],
    },
    fontSize: {
      '2xs': '.5rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.25rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
    },
    extend: {
      colors: {
        textColor: {
          DEFAULT: '#4c586d',
          primary: '#00112f',
          secondary: '#eb4747',
          highlight: '#ffd824',
          muted: '#999fab',
        },
        bgColor: {
          DEFAULT: 'rgba(0,0,0,0)',
          primary: '#00112f',
          secondary: '#eb4747',
          highlight: '#ffd824',
          muted: '#eaebee',
          mutedLight: '#f4f5f6'
        },
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
          DEFAULT: '#999fab',
        },
        inverted: {
          DEFAULT: '#e5e7ea',
          primary: '#e5e7ea',
          secondary: '#e5e7ea',
          highlight: '#ffffff',
          text: '#cccfd5',
          muted: '#667082'
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
    }
  },
  plugins: [],
};
