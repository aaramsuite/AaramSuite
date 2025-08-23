/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'slide-down': 'slideDown 0.4s ease-in-out',
//         'hidden': 'hidden 0.2s ease',
//       },
//       keyframes: {
//         slideDown: {
//           '0%': { transform: 'translateY(-10px)', opacity: 0 },
//           '100%': { transform: 'translateY(0)', opacity: 1 },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
