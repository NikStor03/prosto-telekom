import { Inter } from 'next/font/google';

import { createTheme } from '@mui/material/styles';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1B365D',
      light: '#2E5090',
      dark: '#0F1F3D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0A2647',
      light: '#1B4079',
      dark: '#050F1F',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D1C1D',
      secondary: '#616061',
    },
    divider: '#E0E0E0',
    action: {
      hover: '#F8F8F8',
      disabled: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h4: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1D1C1D',
      letterSpacing: '-0.02em',
      textAlign: 'center',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#454245',
      textTransform: 'none',
      letterSpacing: '0',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.5,
      color: '#616061',
      textAlign: 'center',
    },
    body2: {
      fontSize: '0.9375rem',
      color: '#616061',
    },
    button: {
      fontSize: '1.125rem',
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1.125rem',
          borderRadius: 8,
          padding: '14px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#1B365D',
          '&:hover': {
            backgroundColor: '#0A2647',
          },
        },
        outlined: {
          borderColor: '#DCDCDC',
          color: '#1D1C1D',
          fontWeight: 600,
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#F8F8F8',
            borderColor: '#1B365D',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
            fontWeight: 700,
            color: '#454245',
            transform: 'none',
            position: 'static',
            marginBottom: '8px',
            '&.Mui-focused': {
              color: '#454245',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '1.125rem',
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#868686',
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#454245',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1B365D',
            borderWidth: '2px',
          },
        },
        input: {
          padding: '14px 16px',
          fontSize: '1.125rem',
          '&::placeholder': {
            color: '#868686',
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 700,
          color: '#454245',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});
