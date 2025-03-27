import { createTheme  } from '@mui/material/styles'
import { orange, teal, cyan, grey } from '@mui/material/colors'

// Create a theme instance.
// Dung extendTheme thay cho createTheme de tranh truong hop bi loi nhap nhay (bug flickering)
const theme = createTheme ({
  trello:{
    appBarHeight: 65,
  },
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  // Extend the theme with some custom colors
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3A5FBE',
        },
        secondary: grey
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: {
          main: orange[500],
          light: '#424242'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            with: 8,
            height: 8
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: 8
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00b894',
            borderRadius: 8
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' //huy in hoa
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // Khi input không focus thì border sẽ có màu ...
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          // Khi hover vào input thì border sẽ chuyển sang màu ...
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          },
          '& fieldset': { //huy in dam border khi focus
            borderWidth: '1px !important'
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    }
  }
})

export default theme