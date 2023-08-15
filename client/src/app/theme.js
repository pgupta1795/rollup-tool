import { createTheme } from '@mui/material/styles';
import Colors from '../helper/Colors';

const primary = {
  light: Colors.THEME_LIGHT,
  main: Colors.THEME_MAIN,
  dark: Colors.THEME_DARK,
  contrastText: '#fff',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary,
    alternateTextColor: Colors.THEME_MAIN,
    background: {
      default: '#f5f5f5',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary,
    alternateTextColor: Colors.THEME_MAIN,
    background: {
      default: '#424242',
    },
  },
});
