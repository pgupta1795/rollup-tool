/* eslint-disable import/no-cycle */
import * as TableUtils from '../components/GridTable/tableUtils';
import { BODY, ENDPOINT } from './ServiceUtils';

const baseURL = process.env.REACT_APP_SERVER_URL;

const cache = {};

const fetchResponse = async (url, options, cacheKey) => {
  let resBody;
  if (cacheKey && cache[cacheKey]) {
    resBody = cache[cacheKey];
  } else {
    const response = await fetch(url, options);
    resBody = await response.json();
    if (cacheKey && TableUtils.authenticateTableData(resBody?.data))
      cache[cacheKey] = resBody;
  }

  return resBody;
};

export const login = async (credentials) => {
  const data = {
    username: credentials.username,
    password: credentials.password,
    passportUrl: credentials['3dpassport'],
    spaceUrl: credentials['3dspace'],
    loginTicketURL: ENDPOINT.LOGIN_TICKET,
    casAuthUrl: ENDPOINT.CAS_AUTHENICATION,
    casAuthBody: BODY.CAS_AUTHENICATION_BODY,
    csrfTokenUrl: ENDPOINT.CSRF_TOKEN,
    collabspaceUrl: ENDPOINT.COLLABORATION_SPACE,
  };

  const loginUrl = `${baseURL}/enovia/login`;
  const result = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  if (response.status !== 200) {
    console.error(`${response.message} : Unable to Login`);
    throw response.message;
  }
  return response;
};

/**
 * fetch objects from enovia based on type(mandatory)
 * and
 * limitobjects,skipobjects at start, searchstring (as optional)
 * @param {type} type
 * @param {spaceurl} spaceUrl
 * @param {top} top
 * @param {skip} skip
 * @param {name} name
 * @returns
 */
export const searchObjects = async (type, spaceUrl, top, skip, name) => {
  const data = TableUtils.getSearchBody(type, spaceUrl, top, skip, name);
  if (data) {
    const url = `${baseURL}/enovia/searchobjects`;
    const cacheKey = data.GET_ENDPOINT;
    const response = await fetchResponse(
      url,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(data),
      },
      cacheKey
    );

    if (response.status !== 200) {
      console.error(`${response.message} : Unable to fetch Objects !!`);
      alert(`${response.message} : Unable to fetch Objects !!`);
      return [];
    }
    return response?.data;
  }
  return [];
};

export const updateObject = async (type, object) => {
  const data = TableUtils.getUpdateObjectBody(type, object);
  if (data) {
    const url = `${baseURL}/enovia/updateObject`;
    const response = await fetchResponse(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      console.error(
        `${response.message} : Unable to Update Objects , Please refresh page and try again`
      );
      alert(
        `${response.message} : Unable to Update Objects , Please refresh page and try again`
      );
      return [];
    }
    return response?.data;
  }
  return [];
};

export const getAllChildren = async (type, spaceUrl, id) => {
  const data = TableUtils.getChildrenBody(type, spaceUrl, id);
  if (data) {
    const url = `${baseURL}/enovia/getAllChildren`;
    const cacheKey = id;
    const response = await fetchResponse(
      url,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(data),
      },
      cacheKey
    );

    if (response.status !== 200) {
      console.error(`${response.message} : Unable to fetch Objects !!`);
      alert(`${response.message} : Unable to fetch Objects !!`);
      return [];
    }
    return response?.data;
  }
  return [];
};

/**
 * Execute a function given a delay time
 *
 * @param {type} func
 * @param {type} wait
 * @param {type} immediate
 * @returns {Function}
 */
export const debounce = function (func, wait, immediate) {
  let timeout;
  return function () {
    // eslint-disable-next-line one-var
    const context = this,
      // eslint-disable-next-line prefer-rest-params
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
