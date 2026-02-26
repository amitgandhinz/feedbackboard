import { createTheme, alpha } from '@mui/material/styles'

/**
 * Public CDS-inspired theme (OpenGov Capital Design System look & feel).
 * Built from public token docs: https://opengov.design/capital/styles/tokens
 * No private packages – candidates can run npm install without auth.
 * Styled to closely match CDS: colors, typography, borders, shadows, focus states, transitions.
 */
export const cdsTheme = createTheme({
  spacing: 8, // CDS unit-1 = 8px
  palette: {
    mode: 'light',
    primary: {
      main: '#165CAB', // color-primary-brand
      light: '#1F76D8', // color-primary-selection
      dark: '#044187', // color-primary-medium
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#07305C', // color-primary-dark
      light: '#C2E5FF', // color-primary-hover
      dark: '#07305C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F9FA', // color-gray-50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#131517', // color-gray-1000
      secondary: '#616365', // color-gray-700
      disabled: '#9A9DA1', // color-gray-500
    },
    error: {
      main: '#D15336', // color-error-600
      light: '#E0694F',
      dark: '#B23E24',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#DB831F', // color-warning-600
      light: '#E59539',
      dark: '#C77110',
      contrastText: '#131517',
    },
    success: {
      main: '#549970', // CDS viz-17
      light: '#9AD9A4',
      dark: '#384D3E',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#F7F9FA',
      100: '#EFF2F5',
      200: '#DFE3E8',
      300: '#CED2D6',
      400: '#B5B9BD',
      500: '#9A9DA1',
      600: '#828487',
      700: '#616365',
      800: '#4D4F51',
      900: '#383B3D',
    },
    action: {
      hover: alpha('#165CAB', 0.08),
      selected: alpha('#165CAB', 0.12),
      focus: alpha('#0095FF', 0.2),
      disabled: alpha('#131517', 0.26),
    },
    divider: '#DFE3E8',
  },
  typography: {
    fontFamily: '"Source Sans 3", "Benton Sans", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '0.0125em',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '0.0125em',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '0.0125em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
    subtitle1: {
      fontSize: '1.25rem', // font-size-large
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '0.0125em',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 3,
  },
  shadows: [
    'none',
    '0 1px 0 0 rgba(181, 185, 189, 1)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.1)',
    '0 1px 3px 0 rgba(97, 99, 101, 1)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 4px 8px 0 rgba(19, 21, 23, 0.6)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 0 0 2px #0095FF',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
    '0 2px 4px 0 rgba(19, 21, 23, 0.3)',
  ],
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195 },
    easing: { easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', easeOut: 'cubic-bezier(0, 0, 0.2, 1)', easeIn: 'cubic-bezier(0.4, 0, 1, 1)' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F7F9FA', // color-gray-50
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          boxShadow: '0 1px 0 0 rgba(181, 185, 189, 1)', // box-shadow-hard
          transition: 'box-shadow 300ms ease, background-color 300ms ease',
          '&:hover': { boxShadow: '0 1px 3px 0 rgba(97, 99, 101, 1)' }, // box-shadow-hard-hover
          '&:focus-visible': { boxShadow: '0 0 0 2px #0095FF', outline: 'none' }, // box-shadow-focus
        },
        contained: {
          '&:hover': { boxShadow: '0 1px 3px 0 rgba(7, 48, 92, 0.5)' }, // box-shadow-soft-selected
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            borderColor: '#CED2D6', // border-gray-300
            transition: 'border-color 300ms ease, box-shadow 300ms ease',
          },
          '&:hover fieldset': { borderColor: '#B5B9BD' }, // gray-400
          '&.Mui-focused fieldset': {
            borderWidth: 2,
            borderColor: '#0095FF', // border-primary-focus
            boxShadow: '0 0 0 1px #0095FF',
          },
          '&.Mui-error fieldset': { borderColor: '#D15336' },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          letterSpacing: '0.0125em',
          '&.Mui-focused': { color: '#165CAB' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: 3 },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: 3 },
        outlined: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0095FF',
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 3, // border-radius-default
          boxShadow: '0 2px 4px 0 rgba(19, 21, 23, 0.1)', // box-shadow-above
          border: '1px solid #DFE3E8', // border-gray-200
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          transition: 'background-color 300ms ease',
          '&:hover': { backgroundColor: 'rgba(22, 92, 171, 0.08)' },
          '&.Mui-selected': {
            backgroundColor: 'rgba(22, 92, 171, 0.12)', // primary selection
            '&:hover': { backgroundColor: 'rgba(22, 92, 171, 0.18)' },
          },
          '&:focus-visible': {
            outline: '2px solid #0095FF',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          boxShadow: '0 2px 4px 0 rgba(19, 21, 23, 0.1)',
          border: '1px solid #DFE3E8',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          fontWeight: 600,
          fontSize: '0.75rem',
          border: '1px solid transparent',
          transition: 'background-color 300ms ease, box-shadow 300ms ease',
        },
        colorSuccess: {
          backgroundColor: '#E0F2FF', // color-primary-hover-light
          color: '#044187', // color-primary-medium
        },
      },
    },
  },
})
