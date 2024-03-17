import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },

      colors: {
        txt: {
          primary: {
            DEFAULT: colors.gray[900],
            dark: colors.gray[50],
          },
          secondary: {
            DEFAULT: colors.gray[500],
            dark: colors.gray[400],
          },
          link: {
            DEFAULT: colors.blue[600],
            dark: colors.blue[500],
          },
          highlight: {
            DEFAULT: colors.blue[600],
            dark: colors.blue[500],
          },
          success: {
            DEFAULT: colors.green[700],
            dark: colors.green[400],
          },
          danger: {
            DEFAULT: colors.red[700],
            dark: colors.red[500],
          },
          warning: {
            DEFAULT: colors.yellow[500],
            dark: colors.yellow[300],
          },
        },

        bg: {
          primary: {
            DEFAULT: colors.gray[50],
            dark: colors.gray[900],
          },
        },

        border: {
          DEFAULT: colors.gray[200],
          dark: colors.gray[700],
        },
      },

      fontFamily: {
        'Roboto': ['Roboto', "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      }
    },
  },
  plugins: [],
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
};
