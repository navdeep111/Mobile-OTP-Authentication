/** @type {import('tailwindcss').Config} */
export default {
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary01':'#E40443',
        'primary07':'#FCE6EC',
        'green01':'#41B079',
      },
      backgroundColor: {
        'primary-darker': '#B60336',
      },
      fontFamily:{
        Montserrat:['Montserrat','bigmont']
      },
      theme: {
        fontFeatureSettings: {
          'clig-off': ['"clig" off'],
          'liga-off': ['"liga" off'],
        },
      },
      container: {
        padding: '2rem',
      },
    },
  },
  plugins: [],
}

