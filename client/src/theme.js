import { createTheme } from '@mui/material/styles';

const light = '#c5cae9';
const main = '#9575cd';
const dark = '#ba68c8';

const primary = {
  light,
  main,
  dark,
  contrastText: '#fff',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary,
    alternateTextColor: main,
    background: {
      default: '#f5f5f5',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary,
    alternateTextColor: main,
    background: {
      default: '#424242',
    },
  },
});
