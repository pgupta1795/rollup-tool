const fetch = require('node-fetch');

let attempts = 0;

const wait = (time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
};

const retryFetch = async (url = '', options = {}) => {
  const {
    retry = false,
    retryDelay = 0,
    retries = 5,
    ...requestOptions
  } = options;
  attempts += 1;

  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    if (retry && attempts <= retries) {
      console.warn({
        message: `Request failed, retrying in ${retryDelay} seconds...`,
        error: error?.message,
      });
      await wait(retryDelay);
      return retryFetch(url, options, retry, retryDelay);
    } else {
      throw new Error(error);
    }
  }
};

module.exports = retryFetch;
