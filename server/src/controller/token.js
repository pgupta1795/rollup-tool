const jwt = require('jsonwebtoken');
const { performLogin } = require('./auth');
const { addRefreshTokenCookie } = require('./service/cookieService');
const {
  generateAccessToken,
  findTokenByUserId,
} = require('./service/tokenService');

const getRefreshToken = async (req, res) => {
  const { cookies } = req;
  let refreshToken = cookies.jwt;
  if (!refreshToken) {
    const { username } = cookies;
    const exisitingObject = await findTokenByUserId(username);
    refreshToken = exisitingObject.token;
    if (refreshToken) addRefreshTokenCookie(res, refreshToken);
  }
  return refreshToken;
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = await getRefreshToken(req, res);
    if (!refreshToken) {
      res.status(403).json({ message: err });
      return;
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, loginBody) => {
        if (err) {
          console.log(
            `**** Verify if Refresh Token is valid **** \n  Error : ${err}`
          );
          res.status(403).json({ message: err });
          return;
        }
        try {
          const details = await performLogin(loginBody);
          console.log(`**** NEW Login Performed ****`);
          const accessToken = generateAccessToken(details);
          res.status(200).json({ accessToken });
        } catch (error) {
          console.error(error);
          res
            .status(error.type === 'invalid-json' ? 403 : 500)
            .json({ message: error });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(error.type === 'invalid-json' ? 403 : 500)
      .json({ message: error });
  }
};

module.exports = { refreshToken };
