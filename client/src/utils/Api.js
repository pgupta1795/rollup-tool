import * as TableUtils from "../components/GridTable/tableUtils";
import { authenticateTableData } from "../components/Auth/RequireAuth";

const baseURL = "http://localhost:5000/api/enovia";

const cache = {};

const fetchResponse = async (url, options, cacheKey) => {
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

//fetch objects from enovia based on type(mandatory) and limitobjects,skipobjects at start, searchstring (as optional)
export const searchObjects = async (type, spaceUrl, top, skip, name) => {
  const data = TableUtils.getSearchBody(type, spaceUrl, top, skip, name);
  if (data) {
    const url = baseURL + "/searchobjects";
    const cacheKey = data.GET_ENDPOINT;
    const response = await fetchResponse(
      url,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      },
      cacheKey
    );

    if (response.status !== 200) {
      console.error(response.message + " : Unable to fetch Objects !!");
      alert(response.message + " : Unable to fetch Objects !!");
      return [];
    }
    return response?.data;
  }
  return [];
};

export const updateObject = async (type, object) => {
  const data = TableUtils.getUpdateObjectBody(type, object);
  if (data) {
    const url = baseURL + "/updateObject";
    const response = await fetchResponse(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      console.error(
        response.message +
          " : Unable to Update Objects , Please refresh page and try again"
      );
      alert(
        response.message +
          " : Unable to Update Objects , Please refresh page and try again"
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
    const url = baseURL + "/getAllChildren";
    const cacheKey = id;
    const response = await fetchResponse(
      url,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      },
      cacheKey
    );

    if (response.status !== 200) {
      console.error(response.message + " : Unable to fetch Objects !!");
      alert(response.message + " : Unable to fetch Objects !!");
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
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
