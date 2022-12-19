import { createTheme } from '@mui/material/styles';

const light = '#73ddf6';
const main = '#3EB1C8';
const dark = '#005F83';

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
