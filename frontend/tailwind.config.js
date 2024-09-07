/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode switching
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        primary: {
          DEFAULT: "#FF6347", // Tomato color
          light: "#FFA07A", // Light tomato
        },
        secondary: {
          DEFAULT: "#2C3E50", // Dark grayish color
          light: "#BDC3C7", // Soft gray
        },
        accent: {
          DEFAULT: "#FF4500", // Stronger orange-red
          light: "#FA8072", // Light coral
        },
        background: {
          DEFAULT: "#FFFFFF", // White for light mode
          light: "#F8F9FA", // Slight off-white
        },

        // Dark Mode Colors
        "primary-dark": "#FF6347", // Same Tomato color
        "secondary-dark": "#1C2833", // Darker gray
        "accent-dark": "#FF4500", // Dark strong orange-red
        "background-dark": "#2C3E50", // Dark background
      },
    },
  },
  plugins: [],
};
