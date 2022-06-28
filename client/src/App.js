import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './authentication/auth';
import { IsLogin, RequireAuth } from './components/Auth/RequireAuth';
import Header from './components/Header/header';
import Paths from './helper/Paths';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ObjectPage from './pages/ObjectPage';
import TypesPage from './pages/TypesPage';
import './Styles/App.css';
import { darkTheme, lightTheme } from './theme';

const App = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <AuthProvider>
      <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
        <ThemeProvider theme={checked ? darkTheme : lightTheme}>
          <Router>
            <ToastContainer />
            <CssBaseline />
            <Header checked={checked} setChecked={setChecked} />
            <Routes>
              <Route
                path={Paths.LOGIN}
                element={
                  <IsLogin>
                    <LoginPage />
                  </IsLogin>
                }
              />
              <Route
                path={Paths.HOME}
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route
                path={`${Paths.HOME}/:type`}
                element={
                  <RequireAuth>
                    <TypesPage />
                  </RequireAuth>
                }
              />
              <Route
                path={`${Paths.HOME}/:type/:id`}
                element={
                  <RequireAuth>
                    <ObjectPage />
                  </RequireAuth>
                }
              />
              <Route path={Paths.ERROR} element={<ErrorPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Box>
    </AuthProvider>
  );
};

export default App;
