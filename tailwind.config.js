/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // hover: variants only apply on devices that truly support hovering (i.e.
  // not touchscreens). Stops the hero "spotlight" hover from sticking on
  // mobile and blurring the text on tap.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

