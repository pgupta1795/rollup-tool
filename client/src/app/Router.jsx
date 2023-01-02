import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import IsLogin from '../components/Auth/IsLogin';
import RequireAuth from '../components/Auth/RequireAuth';
import ScrollToTop from '../components/Common/ScrollToTop';
import Paths from '../helper/Paths';
import DashboardPage from '../pages/DashboardPage';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const ObjectPage = lazy(() => import('../pages/ObjectPage'));
const TypesPage = lazy(() => import('../pages/TypesPage'));

const Router = () => (
  <ScrollToTop>
    <Routes>
      <Route
        path={Paths.LOGIN}
        element={
          <IsLogin>
            <Suspense fallback={<>...</>}>
              <LoginPage />
            </Suspense>
          </IsLogin>
        }
      />
      <Route
        path={Paths.HOME}
        element={
          <RequireAuth>
            <Suspense fallback={<>...</>}>
              <HomePage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path={Paths.DASHBOARD}
        element={
          <RequireAuth>
            <Suspense fallback={<>...</>}>
              <DashboardPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        exact
        path={`${Paths.TYPE}/:type`}
        element={
          <RequireAuth>
            <Suspense fallback={<>...</>}>
              <TypesPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path={`${Paths.TYPE}/:type/:id`}
        element={
          <RequireAuth>
            <Suspense fallback={<>...</>}>
              <ObjectPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route path={Paths.ERROR} element={<ErrorPage />} />
    </Routes>
  </ScrollToTop>
);

export default Router;
