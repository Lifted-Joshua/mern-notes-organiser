import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
  themes: [
    {
      mytheme: {
        "primary": "#2563eb",   // strong blue (for buttons, links)
        "secondary": "#60a5fa", // lighter blue
        "accent": "#06b6d4",    // teal for highlights
        "neutral": "#1e293b",   // near-black for text/contrast
        "base-100": "#ffffff",  // white background
        "base-200": "#f1f5f9",  // light gray cards
        "info": "#3b82f6",      // blue info state
        "success": "#22c55e",   // green success
        "warning": "#facc15",   // yellow warning
        "error": "#ef4444",     // red error
      },
    },
    "halloween", // keep if you still want the option to switch back
  ],
},

}