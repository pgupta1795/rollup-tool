import Constants from '../helper/Constants';
import toast from '../helper/toast';
import { getSpaceCookies } from '../services/AuthService';
import { BODY, ENDPOINT, URL } from '../utils/ServiceUtils';
import { axios } from './axios';

const spaceUrl = URL.SPACE_URL;

export const loginUser = async (credentials) => {
  const response = await axios({
    method: 'POST',
    url: `/enovia/login`,
    data: {
      username: credentials.username,
      password: credentials.password,
      passportUrl: URL.PASSPORT_URL,
      spaceUrl,
      loginTicketURL: ENDPOINT.LOGIN_TICKET,
      casAuthUrl: ENDPOINT.CAS_AUTHENICATION,
      casAuthBody: BODY.CAS_AUTHENICATION_BODY,
      csrfTokenUrl: ENDPOINT.CSRF_TOKEN,
      collabspaceUrl: ENDPOINT.COLLABORATION_SPACE,
    },
  });
  if (response.status === 200) return response;
  toast.error(Constants.LOGIN_ERROR);
  throw response.message;
};

export const logoutUser = async (passportUrl, username) => {
  const response = await axios({
    method: 'POST',
    url: `/enovia/logout`,
    data: {
      logoutTicketURL: ENDPOINT.LOGOUT_TICKET,
      Cookies: getSpaceCookies(),
      passportUrl,
      username,
    },
  });
  if (response.status === 200) return response;
  toast.error(Constants.LOGIN_ERROR);
  throw response.message;
};
