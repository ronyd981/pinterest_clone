/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-gray": "#111111",
        "secondary-gray": "#333333",
        "primary-red": "#e60023",
        "secondary-red": "#cc0000",
      },
    },
  },
  plugins: [
    {
      handler(api) {
        api.addUtilities({
          ".no-scrollbar": {
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
        });
      },
    },
  ],
};
