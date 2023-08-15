/**
 * Assign refresh token in http-only cookie
 * @param {*} res
 * @param {*} refreshToken
 */
const addRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day of refresh cookie
  });
};

const removeRefreshTokenCookie = (res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
};

/**
 * Add cookie to the response of the request
 * @param {*} res
 * @param {*} key
 * @param {*} value
 */
const addCookie = (res, key, value) => {
  res.cookie(key, value, {
    sameSite: 'None',
    secure: true,
  });
};

const removeCookie = (res, key) => {
  res.clearCookie(key, {
    sameSite: 'None',
    secure: true,
  });
};

const mergeCookie = (c1, c2) => {
  return c1.join(';').concat(';').concat(c2);
};

module.exports = {
  addRefreshTokenCookie,
  removeRefreshTokenCookie,
  addCookie,
  removeCookie,
  mergeCookie,
};
