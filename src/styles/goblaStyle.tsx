import { createTheme } from '@mui/material/styles';

export const innerTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: { width: '100%' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        input {
          border: none;
          width: 100%;
          text-align: center;
          height: 2rem;
          background: #F5F5F5
        },
        input:focus {
          outline:none;
        },
        textarea {
          border: none;
          width: 100%;
          height: 2rem;
          background: #F5F5F5
        },
        textarea:focus {
          outline:none;
        },
      `,
    },
  },
  palette: {
    background: {
      default: 'white',
    },
  },
});
