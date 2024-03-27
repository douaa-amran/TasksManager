/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purpletext': '#B360E6',
        'custom-purple': '#934FBC',
        'custom-purplehover': '#784099',
        'custom-peach' : '#CF60B5',
      },
    },
  },
  plugins: [],
}

