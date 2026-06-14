/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./app/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./lib/**/*.{js,jsx}",
 ],
 theme: {
  screens: {
   sm: "40rem",
   md: "48rem",
   lg: "64rem",
   xl: "80rem",
   "2xl": "96rem",
  },
  extend: {
   fontFamily: {
    sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
    body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
    display: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
    heading: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
   },
   borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
   },
   spacing: {
    section: "5rem",
    "section-sm": "3.5rem",
    container: "1.25rem",
   },
   maxWidth: {
    site: "90rem",
    "site-shell": "96rem",
   },
   colors: {
    cream: "var(--cream)",
    sand: "var(--sand)",
    stone: "var(--stone)",
    charcoal: "var(--charcoal)",
    "kalif-blue": "var(--kalif-blue)",
   },
  },
 },
 plugins: [],
};
