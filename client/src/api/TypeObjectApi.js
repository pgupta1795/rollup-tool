import Constants from '../helper/Constants';
import { getUpdateObjectBody } from '../helper/payload';
import toast from '../helper/toast';
import { URL } from '../utils/ServiceUtils';
import axiosPrivate from './axios';

const spaceUrl = URL.SPACE_URL;

export const createTypeObject = async (type, object) => {
  const data = getUpdateObjectBody(type, object);
  if (!data) return [];
  const response = await axiosPrivate({
    method: 'POST',
    url: `/store/createTypeObject`,
    data,
  });
  if (response.status === 200) return response?.data;
  console.warn(Constants.ACTIONS_EXISTS_WARNING);
  return [];
};

export const getTypeObjectById = async (id) => {
  const params = { id };
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const response = await axiosPrivate({
    method: 'GET',
    url: `/store/getTypeObjectById?${query}`,
  });

  if (response.status === 200) return response?.data;
  console.error(response.message);
  toast.error(Constants.GET_ACTIONS_ERROR);
  return [];
};

export const updateTypeObjectById = async (id, param, value) => {
  const params = { id, param, value };
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const response = await axiosPrivate({
    method: 'GET',
    url: `/store/updateTypeObject?${query}`,
  });
  if (response.status === 200) return response?.data;
  console.error(response.message);
  toast.error(Constants.GET_ACTIONS_ERROR);
  return [];
};

export const getTypeObjects = async (limit, skip) => {
  const params = { limit, skip, spaceUrl };
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const response = await axiosPrivate({
    method: 'GET',
    url: `/store/getTypeObjects?${query}`,
  });
  if (response.status === 200) return response?.data;
  console.error(response.message);
  toast.error(Constants.GET_ACTIONS_ERROR);
  return [];
};
