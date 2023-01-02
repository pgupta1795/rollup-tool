import Constants from '../helper/Constants';
import {
  getChildrenBody,
  getSearchBody,
  getUpdateObjectBody,
} from '../helper/payload';
import toast from '../helper/toast';
import axiosPrivate from './axios';

/**
 * fetch objects from enovia based on type(mandatory)
 * and
 * limitobjects,skipobjects at start, searchstring (as optional)
 * @param {type} type
 * @param {top} top
 * @param {skip} skip
 * @param {name} name
 * @returns
 */
export const searchObjects = async (type, top, skip, name) => {
  const data = getSearchBody(type, top, skip, name);
  if (!data) return [];
  // const cacheKey = data.GET_ENDPOINT;
  const response = await axiosPrivate({
    method: 'POST',
    url: `/enovia/searchobjects`,
    data,
  });

  if (response.status === 200) return response?.data;
  console.error(response.message, Constants.FETCH_ERROR);
  toast.error(Constants.FETCH_ERROR);
  return [];
};

export const updateObject = async (type, object) => {
  const data = getUpdateObjectBody(type, object);
  if (!data) return [];
  const response = await axiosPrivate({
    method: 'POST',
    url: `/enovia/updateObject`,
    data,
  });
  if (response.status === 200) return response?.data;
  toast.error(`${response.message}`);
  throw new Error(`${response.message} \n ${Constants.EDIT_OBJECT_ERROR}`);
};

export const getAllChildren = async (type, id) => {
  const data = getChildrenBody(type, id);
  if (!data) return [];
  const response = await axiosPrivate({
    method: 'POST',
    url: `/enovia/getAllChildren`,
    data,
  });
  if (response.status === 200) return response?.data;
  console.error(response.message, Constants.FETCH_ERROR);
  toast.error(Constants.FETCH_ERROR);
  throw new Error(response.message);
};
