import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../authentication/auth';
import Paths from '../../helper/Paths';

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.cookies.username) {
    return <Navigate to={Paths.LOGIN} state={{ path: location.pathname }} />;
  }

  return children;
};

export const IsLogin = ({ children }) => {
  const auth = useAuth();

  if (auth.cookies.username) {
    return <Navigate to={Paths.HOME} />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

IsLogin.propTypes = {
  children: PropTypes.element.isRequired,
};
