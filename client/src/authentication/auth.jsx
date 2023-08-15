import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast as reactToast } from 'react-toastify';
import { loginUser, logoutUser } from '../api/AuthApi';
import Constants from '../helper/Constants';
import Paths from '../helper/Paths';
import toast from '../helper/toast';
import { AuthContext } from '../hooks/contexts';
import { removeCookies } from '../services/CookieService';
import { removeToken, setToken } from '../services/TokenService';

export const AuthProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const login = async (credentials, location, navigate) => {
    try {
      setProgress(true);
      const response = await loginUser(credentials);
      const accessToken = response.data?.accessToken;
      setToken(accessToken);
      const path = Paths.HOME;
      navigate(location?.state?.path || path, { replace: true });
      toast.success(Constants.LOGIN_SUCESS);
    } catch (error) {
      console.error(error);
      toast.error(Constants.LOGIN_ERROR);
    } finally {
      setProgress(false);
    }
  };

  const logout = async (passportURL, username) => {
    try {
      await reactToast.promise(logoutUser(passportURL, username), {
        pending: Constants.START_LOGOUT,
        success: Constants.LOGOUT_SUCESS,
        error: 'Error 🤯',
      });
      <Navigate to={Paths.LOGIN} />;
      toast.info(Constants.LOGOUT_SUCESS);
    } catch (error) {
      <Navigate to={Paths.LOGIN} />;
      console.error(error);
      toast.error(error.message);
    } finally {
      removeToken();
      removeCookies();
      window.location.reload();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        progress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => useContext(AuthContext);
