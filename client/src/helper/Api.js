import { fetchResponse } from './fetchUtils';
import { BODY, ENDPOINT } from './ServiceUtils';
import { getSearchBody, getChildrenBody, getUpdateObjectBody } from './payload';
import StorageConstants from './StorageConstants';

const baseURL = process.env.REACT_APP_SERVER_URL;

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
  const data = getSearchBody(type, spaceUrl, top, skip, name);
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
  const data = getUpdateObjectBody(type, object);
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
  const data = getChildrenBody(type, spaceUrl, id);
  if (data) {
    const url = `${baseURL}/enovia/getAllChildren`;
    const response = await fetchResponse(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      console.error(`${response.message} : Unable to fetch Objects !!`);
      alert(`${response.message} : Unable to fetch Objects !!`);
      return [];
    }
    return response?.data;
  }
  return [];
};

export const createTypeObject = async (type, object) => {
  const data = getUpdateObjectBody(type, object);
  if (data) {
    const url = `${baseURL}/store/createTypeObject`;
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(data),
    };
    const response = await fetchResponse(url, options);

    if (response.status !== 200) {
      const err =
        'Unable to update the selected row in db as it may already exists';
      console.warn(err);
      return [];
    }
    return response?.data;
  }
  return [];
};

export const createAction = async (id, newRow, oldRow) => {
  const data = {
    spaceUrl: localStorage.getItem(StorageConstants.SPACE3d),
    userName: `${localStorage.getItem(
      StorageConstants.FirstName
    )} ${localStorage.getItem(StorageConstants.LastName)}`,
    objectId: id,
    oldObject: JSON.stringify(oldRow),
    newObject: JSON.stringify(newRow),
  };
  const url = `${baseURL}/store/createAction`;
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(data),
  };
  const response = await fetchResponse(url, options);

  if (response.status !== 200) {
    const err = 'Unable to create action';
    console.error(err);
    return [];
  }
  return response?.data;
};

export const getActions = async () => {
  const url = `${baseURL}/store/getActions`;
  const response = await fetchResponse(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: '*/*',
    },
  });

  if (response.status !== 200) {
    console.error(`${response.message} : Unable to get actions`);
    alert(`${response.message} : Unable to get actions`);
    return [];
  }
  return response?.data;
};
