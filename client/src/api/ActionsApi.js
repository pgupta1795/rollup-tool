import Constants from '../helper/Constants';
import toast from '../helper/toast';
import { getUserFullName } from '../services/AuthService';
import { URL } from '../utils/ServiceUtils';
import axiosPrivate from './axios';

const spaceUrl = URL.SPACE_URL;

export const createAction = async (id, newRow, oldRow) => {
  const response = await axiosPrivate({
    method: 'POST',
    url: `/store/createAction`,
    data: {
      spaceUrl,
      userName: getUserFullName(),
      objectId: id,
      oldObject: JSON.stringify(oldRow),
      newObject: JSON.stringify(newRow),
    },
  });
  if (response.status === 200) return response?.data;
  console.warn(Constants.CREATE_ACTION_ERROR);
  toast.warning(Constants.CREATE_ACTION_ERROR);
  return [];
};

export const getActions = async () => {
  const params = {
    // limit,
    // skip,
    spaceUrl,
    userName: getUserFullName(),
  };
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const response = await axiosPrivate({
    method: 'GET',
    url: `/store/getActions?${query}`,
  });
  if (response.status === 200) return response?.data;
  console.error(response.message);
  toast.error(Constants.GET_ACTIONS_ERROR);
  return [];
};
