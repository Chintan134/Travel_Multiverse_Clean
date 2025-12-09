/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: "#5A7FA3",       // Ocean Mist Blue
        sage: "#7B9E8A",        // Sage Mountain Green
        sunset: "#E7A97E",      // Sunset Sand Coral
        beige: "#F4EDE2",       // Nomad Beige
        cloud: "#FAFAF8",       // Cloud Drift White
        stone: "#2A2A2A",       // Everstone Charcoal
        fog: "#BFC5C8",         // Wanderfog Grey
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
