import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import Paths from '../../helper/Paths';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.cookies.username)
    return <Navigate to={Paths.LOGIN} state={{ path: location.pathname }} />;
  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequireAuth;
