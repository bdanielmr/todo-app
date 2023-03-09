import { createTheme } from '@mui/material/styles';

export const innerTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        header {
        }
      `,
    },
  },
  palette: {
    background: {
      default: 'white',
    },
  },
});
