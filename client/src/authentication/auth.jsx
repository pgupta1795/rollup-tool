import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import toast from '../helper/toast';
import Paths from '../helper/Paths';
import * as Api from '../helper/Api';
import { removeStorage, setStorage } from '../utils/CommonUtils';
import { COOKIE_OPTIONS, initialAuthDetail } from './props';
import { AuthContext } from '../hooks/contexts';
import Constants from '../helper/Constants';

export const AuthProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [cookies, setCookie] = useCookies([
    'username',
    'Cookies',
    'CSRF_TOKEN',
    '3dspace',
    '3dpassport',
  ]);
  const [authDetails, setAuthDetails] = useState(initialAuthDetail);

  const handleCookie = (credentials, storageItems) => {
    setCookie('username', credentials.username, COOKIE_OPTIONS);
    setCookie('Cookies', credentials.Cookies, COOKIE_OPTIONS);
    setCookie('CSRF_TOKEN', credentials.CSRF_TOKEN, COOKIE_OPTIONS);
    setCookie('3dspace', credentials['3dspace'], COOKIE_OPTIONS);
    setCookie('3dpassport', credentials['3dpassport'], COOKIE_OPTIONS);
    if (storageItems) setStorage(storageItems);
  };

  const login = async (credentials, location, navigate) => {
    try {
      setProgress(true);
      const response = await Api.login(credentials);
      credentials.CSRF_TOKEN = response?.data?.csrf?.value;
      credentials.Cookies = response['set-cookie'];
      const { firstname, lastname, preferred, securityContexts } = response;
      const { username, password, CSRF_TOKEN, Cookies } = credentials;
      handleCookie(credentials, {
        firstname,
        lastname,
        preferred,
        securityContexts,
        CSRF_TOKEN,
        Cookies,
        '3dspace': credentials['3dspace'],
      });
      setAuthDetails({
        username,
        password,
        '3dspace': credentials['3dspace'],
        CSRF_TOKEN,
        Cookies,
        '3dpassport': credentials['3dpassport'],
      });
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

  const logout = () => {
    setAuthDetails(initialAuthDetail);
    handleCookie({
      username: '',
      password: '',
      '3dspace': cookies['3dspace'],
      CSRF_TOKEN: '',
      Cookies: '',
      '3dpassport': cookies['3dpassport'],
    });
    removeStorage();
    toast.success(Constants.LOGOUT_SUCESS);
  };

  return (
    <AuthContext.Provider
      value={{
        authDetails,
        login,
        logout,
        cookies,
        handleCookie,
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
