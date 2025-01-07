const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        equalizer: {
          '0%, 100%': { height: '0%' },
          '50%': { height: '100%' },
        }
      },
      animation: {
        equalizer: 'equalizer 1s ease-in-out infinite',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

