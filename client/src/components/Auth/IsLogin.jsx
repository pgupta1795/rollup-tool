import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import Paths from '../../helper/Paths';

const IsLogin = ({ children }) => {
  const auth = useAuth();
  if (auth.cookies.username) return <Navigate to={Paths.DASHBOARD} />;
  return children;
};

IsLogin.propTypes = {
  children: PropTypes.element.isRequired,
};

export default IsLogin;
