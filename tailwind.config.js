/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,jsx,ts,tsx}", // CRA source files
  ],
  theme: {
    extend: {
      colors: {
        primaryblue: '#5f79b4',
        secondarypink: '#d6a8d0',
        accentpink: '#c686a5',
        gradientmid: '#9380AC',
        maintextblack: '#06070e',
        secondarytextblack: '#66000000'
      }
    },
  },
  plugins: [],
}

