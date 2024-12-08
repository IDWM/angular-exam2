/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      extend: {
        animation: {
          "fade-in": "fadeIn 0.3s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0", transform: "translateY(-10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
