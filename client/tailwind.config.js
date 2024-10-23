/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },


      fontSize: {
        'custom-16': ['16px', '24px'],  // font-size of 16px with line-height of 24px
      },


      fontWeight: {
        500: '500',  // font-weight of 500
      },

      
    },
  },
  plugins: [],
}