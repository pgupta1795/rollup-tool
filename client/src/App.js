import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './authentication/auth';
import { IsLogin, RequireAuth } from './components/Auth/RequireAuth';
import Header from './components/Header/header';
import Paths from './helper/Paths';
import useMode from './hooks/useMode';
import './Styles/css/App.css';
import { darkTheme, lightTheme } from './theme';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ObjectPage = lazy(() => import('./pages/ObjectPage'));
const TypesPage = lazy(() => import('./pages/TypesPage'));

const App = () => {
  const [checked, setChecked] = React.useState(useMode() === 'dark');
  return (
    <AuthProvider>
      <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
        <ThemeProvider theme={checked ? darkTheme : lightTheme}>
          <BrowserRouter>
            <Suspense>
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
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Box>
    </AuthProvider>
  );
};

export default App;
