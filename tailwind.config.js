/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'grid-cols-18',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pokémon type colors - matching the icon set
        type: {
          bug: '#8CB230',
          grass: '#62A95A',
          fairy: '#E17EB5',
          steel: '#8A919B',
          dragon: '#6658A5',
          psychic: '#E86A8C',
          ghost: '#7C6AAF',
          ground: '#C5A55D',
          rock: '#B99E6A',
          fire: '#F4943E',
          flying: '#6DC5C9',
          ice: '#70C6D2',
          electric: '#F5C739',
          normal: '#C2B99D',
          dark: '#5D5448',
          water: '#5AA0DE',
          fighting: '#D15540',
          poison: '#A76AA8',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
