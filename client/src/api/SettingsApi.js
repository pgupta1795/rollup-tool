/* eslint-disable import/prefer-default-export */
import Constants from '../helper/Constants';
import toast from '../helper/toast';
import axiosPrivate from './axios';

export const updateSettings = async (json) => {
  const response = await axiosPrivate({
    method: 'POST',
    url: `/settings/update`,
    data: json,
  });
  if (response.status === 200) return response?.data;
  console.warn(Constants.CREATE_ACTION_ERROR);
  toast.warning(Constants.CREATE_ACTION_ERROR);
  return [];
};
