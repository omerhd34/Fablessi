/** @type {import('tailwindcss').Config} */
/** Breakpoint değerleri: lib/layout/breakpoints.js — lg=1024, xl=1440, desktop=1441+ */
module.exports = {
 content: [
  "./app/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./lib/**/*.{js,jsx}",
 ],
 theme: {
  screens: {
   sm: "640px",
   md: "768px",
   lg: "1024px",
   xl: "1440px",
   "2xl": "1536px",
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
    site: "1440px",
    "site-wide": "1600px",
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
