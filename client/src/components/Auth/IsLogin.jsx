import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Paths from '../../helper/Paths';
import { getUserName } from '../../services/CookieService';
import { ACCESS_TOKEN } from '../../services/TokenService';

const IsLogin = ({ children }) => {
  if (getUserName() && localStorage.getItem(ACCESS_TOKEN))
    return <Navigate to={Paths.HOME} />;
  return children;
};

IsLogin.propTypes = {
  children: PropTypes.element.isRequired,
};

export default IsLogin;
