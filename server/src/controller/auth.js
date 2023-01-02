const retryFetch = require('../helper/fetch');
const authService = require('./service/authService');
const {
  addRefreshTokenCookie,
  addCookie,
  mergeCookie,
  removeRefreshTokenCookie,
  removeCookie,
} = require('./service/cookieService');
const {
  generateAccessToken,
  generateRefreshToken,
  generateNewToken,
  deleteToken,
} = require('./service/tokenService');

const performLogin = async (loginBody) => {
  let [ltResponse, ltCookie] = await authService.fetchLoginTicket(loginBody);
  const casResponse = await authService.casAuthentication(
    ltResponse,
    loginBody,
    ltCookie
  );
  let casAuthCookie = casResponse.headers['set-cookie'];
  const ticket = casResponse.headers.location?.split('ticket=')[1];
  if (!ticket) throw new Error('Service Ticket could not be fetched');
  const { ENO_CSRF_TOKEN, Cookies } = await authService.getCsrfAndCookie(
    loginBody,
    casAuthCookie,
    ticket
  );
  const collabSpaceDetails = await authService.fetchCollabspaces(
    loginBody,
    Cookies
  );
  const appCookie = mergeCookie(casAuthCookie, ltCookie)
    .concat(';')
    .concat(Cookies);
  return {
    statusText: true,
    loginBody,
    ENO_CSRF_TOKEN,
    Cookie: appCookie,
    ...collabSpaceDetails,
    ticket,
  };
};

/**
 * generate login ticket, perform cas authentication, generate csrf-token and then generate all security contexts related to the logged in person
 * @param {req} req
 * @param {res} res
 */
const login = async (req, res) => {
  try {
    const { loginBody, ...details } = await performLogin(req.body);
    // create accesstoken using ootb env details eg : ENO_CSRF_TOKEN, Cookies, securityContexts
    const accessToken = generateAccessToken(details);
    // create refreshtoken using user details and api endpoints
    const refreshToken = generateRefreshToken(loginBody);
    generateNewToken(req.body.username, refreshToken);
    // add cookies
    addRefreshTokenCookie(res, refreshToken);
    addCookie(res, 'username', req.body.username);
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const logout = async (req, res) => {
  try {
    const { passportUrl, Cookies, logoutTicketURL, username } = req.body;
    const { cookies } = req;
    if (!cookies?.jwt) res.sendStatus(403); // forbidden
    const result = await retryFetch(passportUrl + logoutTicketURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cookie: Cookies,
      },
      redirect: 'follow',
      retry: false,
      retryDelay: 0,
      retries: 0,
    });

    const response = await result.json();
    // delete token
    deleteToken(username);
    // remove cookies
    removeRefreshTokenCookie(res);
    removeCookie(res, 'username');
    res.status(200).json({
      message: 'Logout successfull',
      headers: response.headers,
    });
  } catch (error) {
    // delete token
    deleteToken(req.body.username);
    // remove cookies
    removeRefreshTokenCookie(res);
    removeCookie(res, 'username');
    console.error(error);
    res.status(200).json({ message: error });
  }
};

module.exports = { performLogin, login, logout };
