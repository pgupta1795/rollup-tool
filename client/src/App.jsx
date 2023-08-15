import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './app/Router';
import { darkTheme, lightTheme } from './app/theme';
import { AuthProvider } from './authentication/auth';
import Header from './components/Header/header';
import { getTheme } from './features/theme/themeSlice';
import './Styles/css/App.css';

const App = () => {
  const theme = useSelector(getTheme);
  return (
    <AuthProvider>
      <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <BrowserRouter>
            <ToastContainer />
            <CssBaseline />
            <Header />
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </Box>
    </AuthProvider>
  );
};

export default App;
