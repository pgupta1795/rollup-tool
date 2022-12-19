import { fetchResponse } from '../utils/fetchUtils';
import Constants from './Constants';
import toast from './toast';

const baseURL = `/api`;

export const getTypeObjectById = async (id) => {
  const params = { id };
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const url = `${baseURL}/store/getTypeObjectById?${query}`;

  const response = await fetchResponse(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: '*/*',
    },
  });

  if (response.status !== 200) {
    console.error(response.message);
    toast.error(Constants.GET_ACTIONS_ERROR);
    return [];
  }
  return response?.data;
};

export const updateTypeObjectById = async (id, param, value) => {
  const params = { id, param, value };
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const url = `${baseURL}/store/updateTypeObject?${query}`;

  const response = await fetchResponse(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: '*/*',
    },
  });

  if (response.status !== 200) {
    console.error(response.message);
    toast.error(Constants.GET_ACTIONS_ERROR);
    return [];
  }
  return response?.data;
};
