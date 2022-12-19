import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './authentication/auth';
import Header from './components/Header/header';
import useMode from './hooks/useMode';
import Router from './Router';
import './Styles/css/App.css';
import { darkTheme, lightTheme } from './theme';

const App = () => {
  const [checked, setChecked] = React.useState(useMode() === 'dark');
  return (
    <AuthProvider>
      <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
        <ThemeProvider theme={checked ? darkTheme : lightTheme}>
          <BrowserRouter>
            <ToastContainer />
            <CssBaseline />
            <Header checked={checked} setChecked={setChecked} />
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </Box>
    </AuthProvider>
  );
};

export default App;
