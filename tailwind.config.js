/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        "rotate-scale-fade": {
          "0%": { opacity: "1", transform: "rotate(0deg)" },

          "100%": { opacity: "1", transform: "rotate(360deg)" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0)", opacity: "1" }, // Start fully invisible and scaled down
          "80%": { transform: "scale(1)", opacity: "1" }, // Zoom to full size
          "85%": { transform: "scale(0.95)", opacity: "1" }, // Slight bounce in
          "90%": { transform: "scale(1)", opacity: "1" }, // Back to full size
          "95%": { transform: "scale(0.98)", opacity: "1" }, // Another small bounce in
          "100%": { transform: "scale(1)", opacity: "1" }, // Final resting state at full size
        },
        "fade-in-from-top": {
          "0%": { opacity: "1", transform: "translateY(-50px)" }, // Start from above and invisible
          "55%": { opacity: "1", transform: "translateY(-30)" }, // End at the final position and fully visible
          "70%": { opacity: "1", transform: "translateY(-25)" }, // End at the final position and fully visible
          "85%": { opacity: "1", transform: "translateY(0)" }, // End at the final position and fully visible
          "90%": { opacity: "1", transform: "translateY(0)" }, // End at the final position and fully visible
          "100%": { opacity: "1", transform: "translateY(0)" }, // End at the final position and fully visible
        },
        "zoom-in-component": {
          "50%": { transform: "scale(.5)", opacity: "1" }, // Start fully invisible and scaled down
          "80%": { transform: "scale(1)", opacity: "1" }, // Zoom to full size
          "85%": { transform: "scale(0.95)", opacity: "1" }, // Slight bounce in
          "90%": { transform: "scale(1)", opacity: "1" }, // Back to full size
          "95%": { transform: "scale(0.98)", opacity: "1" }, // Another small bounce in
          "100%": { transform: "scale(1)", opacity: "1" }, // Final resting state at full size
        },
      },
      animation: {
        "rotate-scale-fade": "rotate-scale-fade 20s infinite linear",
        "zoom-in": "zoom-in .5s ease-out forwards", // New zoom-in effect
        "zoom-in-component": "zoom-in .5s ease-out forwards", // New zoom-in effect
        "fade-in-from-top": "fade-in-from-top .5s ease-out forwards", // Adjust duration and easing as needed
      },
      transitionDelay: {
        "0s": "0s",
        "1s": "1s",
        "2s": "2s",
        "3s": "3s",
      },
    },
  },

  plugins: [],
};
