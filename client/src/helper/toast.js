import { toast as reactToast } from 'react-toastify';

const TOAST_DELAY = 2000;

const { SUCCESS, ERROR, INFO, WARNING, DEFAULT } = reactToast.TYPE;

const execute = (type, message, options) => {
  reactToast(message, {
    type,
    draggable: true,
    autoClose: TOAST_DELAY,
    theme: 'colored',
    ...options,
  });
};

const toast = {
  default: (message, options) => execute(DEFAULT, message, options),
  success: (message, options) => execute(SUCCESS, message, options),
  error: (message, options) => execute(ERROR, message, options),
  warning: (message, options) => execute(WARNING, message, options),
  info: (message, options) => execute(INFO, message, options),
};

export default toast;
