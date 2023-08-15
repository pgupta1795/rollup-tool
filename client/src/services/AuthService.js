import jwt from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Paths from '../helper/Paths';
import { getToken } from './TokenService';

const getDetails = () => {
  try {
    return jwt(getToken());
  } catch (error) {
    console.error(error);
    <Navigate to={Paths.LOGIN} />;
    return null;
  }
};

export const getUserFullName = () => {
  const accessToken = getDetails();
  if (!accessToken) return null;
  const { firstname, lastname } = accessToken;
  return `${firstname} ${lastname}`;
};

export const getSecurityContexts = () => {
  const accessToken = getDetails();
  if (!accessToken) return null;
  const { securityContexts } = accessToken;
  return securityContexts;
};

export const getPreferredCtx = () => localStorage.getItem('preferred');

export const setPreferredCtx = (securityCtx) =>
  localStorage.setItem('preferred', securityCtx);

export const getSpaceCookies = () => {
  const accessToken = getDetails();
  if (!accessToken) return null;
  const { Cookie } = accessToken;
  return Cookie;
};

export const getCSRFToken = () => {
  const accessToken = getDetails();
  if (!accessToken) return null;
  const { ENO_CSRF_TOKEN } = accessToken;
  return ENO_CSRF_TOKEN;
};

export const getStoreTheme = () => localStorage.getItem('theme');

export const setStoreTheme = (theme) => localStorage.setItem('theme', theme);
