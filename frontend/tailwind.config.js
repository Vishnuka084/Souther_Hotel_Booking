/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust according to where your components are located
    "./public/index.html", // If you're using Tailwind in your HTML files as well
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
