/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (only these three colors will be used)
        brand: {
          100: '#ECF4E8', // light background
          200: '#CBF3BB', // soft green accent
          300: '#93BFC7', // blue-ish accent / darker text
          400: '#CBF3BB',
          500: '#93BFC7',
          600: '#93BFC7',
          DEFAULT: '#ECF4E8'
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
