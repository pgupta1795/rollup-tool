import { authenticateTableData } from './CommonUtils';

const cache = {};
export const fetchResponse = async (url, options, cacheKey) => {
  let resBody;
  if (cacheKey && cache[cacheKey]) {
    resBody = cache[cacheKey];
  } else {
    const response = await fetch(url, options);
    resBody = await response.json();
    if (cacheKey && authenticateTableData(resBody?.data))
      cache[cacheKey] = resBody;
  }

  return resBody;
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
