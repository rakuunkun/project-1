module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kaktus-primary": "#F1DDC9",
        "kaktus-text-primary": "#D84727",
        "kaktus-text": "#333333",
      },
      spacing: {
        "image-login": "82vh",
      },
    },
  },
  plugins: [],
};
