module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bug: {
          light: '#c6d16e',
          DEFAULT: '#a8b820',
          dark: '#6d7815'
        },
        dragon: {
          light: '#a27dfa',
          DEFAULT: '#7038f8',
          dark: '#4924a1'
        },
        electric: {
          light: '#fae078',
          DEFAULT: '#f8d030',
          dark: '#a1871f'
        },
        fighting: {
          light: '#d67873',
          DEFAULT: '#c03028',
          dark: '#7d1f1a'
        },
        fire: {
          light: '#f5ac78',
          DEFAULT: '#f08030',
          dark: '#9c531f'
        },
        flying: {
          light: '#c6b7f5',
          DEFAULT: '#a890f0',
          dark: '#6d5e9c'
        },
        ghost: {
          light: '#a292bc',
          DEFAULT: '#705898',
          dark: '#493963'
        },
        grass: {
          light: '#a7db8d',
          DEFAULT: '#78c850',
          dark: '#4e8234'
        },
        ground: {
          light: '#ebd69d',
          DEFAULT: '#e0c068',
          dark: '#927d44'
        },
        ice: {
          light: '#bce6e6',
          DEFAULT: '#98d8d8',
          dark: '#638d8d'
        },
        normal: {
          light: '#c6c6a7',
          DEFAULT: '#a8a878',
          dark: '#6d6d4e'
        },
        poison: {
          light: '#c183c1',
          DEFAULT: '#a040a0',
          dark: '#682a68'
        },
        psychic: {
          light: '#fa92b2',
          DEFAULT: '#f85888',
          dark: '#a13959'
        },
        rock: {
          light: '#d1c17d',
          DEFAULT: '#b8a038',
          dark: '#786824'
        },
        water: {
          light: '#9db7f5',
          DEFAULT: '#6890f0',
          dark: '#445e9c'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
