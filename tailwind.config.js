/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        'blue': {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false // disables browser-specific resets
  }
}
