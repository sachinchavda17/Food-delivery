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
        accent: {
          DEFAULT: "#FF4500", // Stronger orange-red
          light: "#FA8072", // Light coral
        },
        secondary: {
          DEFAULT: "#2C3E50", // Dark grayish color
          light: "#BDC3C7", // Soft gray
        },
        ternary: {
          DEFAULT: "#e5e7eb", // Neutral Gray
          light: "#9ca3af", // Lighter gray, perfect for subtle borders or backgrounds
        },
        background: {
          DEFAULT: "#FFFFFF", // White for light mode
          light: "#F8F9FA", // Slight off-white
        },

        // Dark Mode Colors
        "primary-dark": "#FF6347", // Same Tomato color
        "secondary-dark": "#1C2833", // Darker gray
        "accent-dark": "#FF4500", // Dark strong orange-red
        "ternary-dark": "#d1d5db", // Light gray for dark mode (neutral)
        "background-dark": "#111827", // Dark background
      },
    },
  },
  plugins: [],
};
