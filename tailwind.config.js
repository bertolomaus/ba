/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "~/{assets,components,composables,content,pages}/*.{html,js,json,ts,jsx,tsx,vue}",
  ],
  theme: {
    screens: {
      'sm': "500px",
      'md': "800px",
      'lg': "1328px",
      'xl': "2048px",
      '2xl': '2560px'
    },
    container: {
      center: true,
      screens: {
        'sm': "100%",
        'md': "100%",
        'lg': "100%",
        'xl': "100%",
        '2xl': '100%'
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
          red: '#eb4747',
          blue: '#00319f',
          highlight: '#ffd824',
          muted: '#99a0ac',
        },
        bgColor: {
          DEFAULT: 'rgba(0,0,0,0)',
          primary: '#00112f',
          primaryLight: '#203c6c',
          red: '#eb4747',
          blue: '#00319f',
          highlight: '#ffd824',
          muted: '#e5e7ea',
          mutedLight: '#f4f5f6',
        },
        primary: {
          DEFAULT: '#00112f',
          light: '#192843',
          dark: '#000b20'
        },
        red: {
          DEFAULT: '#eb4747'
        },
        blue: {
          DEFAULT: '#00319f'
        },
        highlight: {
          DEFAULT: '#ffd824'
        },
        muted: {
          DEFAULT: '#99a0ac',
        },
        inverted: {
          DEFAULT: '#e5e7ea',
          primary: '#e5e7ea',
          red: '#e5e7ea',
          blue: '#e5e7ea',
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
      },
      transitionDuration: {
        DEFAULT: '200ms'
      },
      boxShadow: {
        fakeBorder: '0 0 0 1px #000',
        fakeBorder2: '0 0 0 2px #000',
      },
      padding: {
        conainer: '4rem',
        conainerLg: '6rem',
        conainerSm: '2rem',
        conainerXs: '1rem',
        card: '1rem',
        cardSm: '0.5rem',
      }
    }
  },
  plugins: [],
};
