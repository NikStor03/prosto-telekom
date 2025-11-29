import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#36c5f0', // Slack blue
      light: '#89d3df',
      dark: '#1d9fcb',
    },
    secondary: {
      main: '#4a154b', // Slack aubergine
      light: '#7c3a7d',
      dark: '#2b0c2c',
    },
    success: {
      main: '#2eb67d', // Slack green
    },
    warning: {
      main: '#ecb22e', // Slack yellow
    },
    error: {
      main: '#e01e5a', // Slack red
    },
    background: {
      default: '#f6f5f7', // light gray app background
      paper: '#ffffff', // cards / forms
    },
    text: {
      primary: '#1d1c1d', // near‑black
      secondary: '#616061', // muted text
    },
    divider: 'rgba(29,28,29,0.12)',
  },
  typography: {
    // Slack UI использует Lato / system sans [web:232][web:234]
    fontFamily:
      '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 0.2,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});
