import {createTheme} from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xl: 1200,
      lg: 1024,
      md: 768,
      sm: 480,
      xs: 0
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '10px'
          }
        }
      }
    }
  }
});
