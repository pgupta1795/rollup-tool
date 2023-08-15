import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Paths from '../../helper/Paths';
import { getUserName } from '../../services/CookieService';
import { ACCESS_TOKEN } from '../../services/TokenService';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  if (getUserName() && localStorage.getItem(ACCESS_TOKEN)) return children;
  return <Navigate to={Paths.LOGIN} state={{ path: location.pathname }} />;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequireAuth;
