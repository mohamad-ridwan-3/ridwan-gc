import type {Config} from 'tailwindcss'

const withMT = require("@material-tailwind/react/utils/withMT")

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    fontFamily: {
      "avant-garde": 'Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic,sans-serif',
      "apple-system": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      "montserrat": '"Montserrat","HelveticaNeue","Helvetica Neue",sans-serif',
      "inter": ['var(--font-inter)']
      // "inter": '"Inter", sans-serif',
      // "inter-internal": ['var(--font-inter)']
    },
    screens:{
      // default theme
      'screen-d-sm': '576px',
      'screen-d-md': '769px',
      'screen-d-lg': '992px',
      // theme1
      'screen-tm1-sm': '640px',
      'screen-tm1-lg': '1024px',
      'min-container-h': {
        'raw': '(min-height: 930px)'
      }
    }
  },
  plugins: [],
})

export default config