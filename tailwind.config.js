/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#04091d",
        "primary-light": "#1C2232",
        "secondary": "#1A6DF5",
        "secondary-dark": "#103266",
        "gray": "#424959",
        "gray-light": "#deebff",
        "gray-dark": "#1f253b"
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"]
      },
      boxShadow: {
        "2xl": "rgb(51 111 191 / .1) 0 4px 6px -1px,rgb(51 111 191 / .06) 0 2px 4px -1px"
      }
    },
  },
  plugins: [],
}

