/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloudGray: '#666666',
        stoneGay: '#898989', 
        lightGray: '#B0B0B0',
        steelGray: '#9F9F9F',
        orangeCustom: '#FB8526',
        snowWhite: '#FBFBFB',
        antiqueGold: '#B88E2F',
        ivoryCream: '#F9F1E7',
        bronzeGold: '#B88E2F',
        aquaBlue: '#1C89A1',
        crystalAqua: '#40B2BD',
        peach: '#E97171',
        leafGreen: '#11AC53',
        darkBlue: '#000080',
        royalBlue: '#305CDE',
        dimGray: '#3A3A3A'
       
     
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },


      fontSize: {
        'custom-12': ['12px', '18px'],
        'custom-13': ['13px', '19px'],
        'custom-14' : ['14px', '21px'],
        'custom-16': ['16px', '24px'],  // font-size of 16px with line-height of 24px
        'custom-20': ['20px', '30px'],
        'custom-24': ['24px', '36px'],
        'custom-32': ['32px', '48px'],
        'custom-40': ['40px', '48px'],
        'custom-42': ['42px', '63px'],
        'custom-48': ['48px', '72px'],
        'custom-50': ['50px', '75px'],

      },


      fontWeight: {
        500: '500',  // font-weight of 500
        400: '400',
        300: '300'

      },


      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInText: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideInText: 'slideInText 0.8s ease-out',
      },


    },
  },
  plugins: [],
}