const https = require('https');
const retryFetch = require('../helper/fetch');
const axios = require('axios');

const api = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const fetchLoginTicket = async (body) => {
  try {
    const { passportUrl, loginTicketURL } = body;
    const result = await retryFetch(passportUrl + loginTicketURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      retry: true,
      retryDelay: 2,
      retries: 2,
    });
    const response = await result.json();
    console.log('Login Ticket Fetched');
    return [response, result];
  } catch (error) {
    throw new Error(error);
  }
};

const casAuthentication = async (ltResponse, body, passportCookie) => {
  try {
    const { username, password, passportUrl, spaceUrl, casAuthUrl } = body;
    const casAuthBody = body.casAuthBody
      .replace('{}', ltResponse.lt)
      .replace('{}', username)
      .replace('{}', password);
    const url = passportUrl + casAuthUrl.replace('{}', spaceUrl);
    const casResponse = await api({
      url,
      method: 'post',
      maxRedirects: 0,
      followRedirects: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Cookie: passportCookie,
      },
      data: casAuthBody,
    });
    console.log('Authenticated 3dspace with passport');
    return casResponse;
  } catch (error) {
    if (error?.response?.status === 302) {
      return error?.response;
    }
    throw new Error(error);
  }
};

const fetchCSRF = async (body, spaceCookie, ticket) => {
  try {
    console.log(`spaceCookie : ${spaceCookie}`);
    const { spaceUrl, csrfTokenUrl } = body;
    const url = `${spaceUrl}${csrfTokenUrl}&ticket=${ticket}`;
    const result = await retryFetch(url, {
      method: 'GET',
      headers: {
        Cookie: spaceCookie,
      },
      retry: true,
      retryDelay: 2,
      retries: 2,
    });
    const response = await result.json();
    console.log('Fetched CSRF Token');
    return [response, result];
  } catch (error) {
    throw new Error(error);
  }
};

const fetchCollabspaces = async (body, spaceCookie) => {
  try {
    const url = body.spaceUrl + body.collabspaceUrl;
    const response = await retryFetch(url, {
      method: 'GET',
      headers: {
        Cookie: spaceCookie,
        Connection: 'keep-alive',
        Accept: '*/*',
        'Content-type': 'application/json; charset=UTF-8',
      },
      retry: true,
      retryDelay: 2,
      retries: 2,
    });
    const responseData = await response.json();
    if (!responseData?.firstname) {
      return {
        firstname: '',
        lastname: '',
        preferred: '',
        all: [],
      };
    }
    const {
      lastname,
      firstname,
      preferredcredentials: {
        collabspace: { name: pCollabspace } = {},
        organization: { name: pOrganization } = {},
        role: { name: pRole } = {},
      } = {},
      collabspaces,
    } = responseData;

    // Role.Company.Collabspace
    const securityContexts = [];
    collabspaces.forEach(({ name: aCollabspace, couples }) => {
      couples.forEach(
        ({
          organization: { name: aOrganization } = {},
          role: { name: aRole } = {},
        }) => {
          securityContexts.push([aRole, aOrganization, aCollabspace].join('.'));
        }
      );
    });
    console.log('Fetched Collabspaces');
    return {
      firstname,
      lastname,
      preferred: [pRole, pOrganization, pCollabspace].join('.'),
      securityContexts,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const logout = async (req, res) => {
  try {
    const { passportUrl, Cookies, logoutTicketURL } = req.body;
    const response = await api.get(passportUrl + logoutTicketURL, {
      headers: {
        Accept: 'application/json',
        Cookie: Cookies,
      },
    });
    res.json({
      status: response.status,
      statusText: 'Logout successfull',
      headers: response.headers,
    });
  } catch (error) {
    console.error(error);
    res.json({ status: 400, statusText: 'Unable to login' });
  }
};

/**
 * generate login ticket, perform cas authentication, generate csrf-token and then generate all security contexts related to the logged in person
 * @param {req} req
 * @param {res} res
 */
const login = async (req, res) => {
  try {
    let [ltResponse, loginResponse] = await fetchLoginTicket(req.body);

    if (!ltResponse && !ltResponse?.lt) {
      const err = 'Unable to generate login ticket';
      throw new Error(err);
    }
    const loginTicketCookie = loginResponse.headers.get('set-cookie');
    const casResponse = await casAuthentication(
      ltResponse,
      req.body,
      loginTicketCookie
    );
    let casAuthCookie = casResponse.headers['set-cookie'];
    const ticket = casResponse.headers.location?.split('ticket=')[1];
    const [csrfResponse, csrfResult] = await fetchCSRF(
      req.body,
      casAuthCookie,
      ticket
    );
    console.log('fetched CSRF Response', csrfResponse);

    if (!csrfResponse || !csrfResponse?.csrf) {
      res.json({ status: 500, statusText: 'CSRF Token Could not be fetched' });
    }

    let csrfCookie = csrfResult.headers.get('set-cookie');

    let spaceCookie = casAuthCookie
      .join(';')
      .concat(';')
      .concat(loginTicketCookie)
      .concat(';')
      .concat(csrfCookie);

    const { firstname, lastname, preferred, securityContexts } =
      await fetchCollabspaces(req.body, spaceCookie);

    res.json({
      status: csrfResponse.statusCode,
      statusText: true,
      headers: csrfResponse.headers,
      data: csrfResponse,
      'set-cookie': spaceCookie,
      firstname,
      lastname,
      preferred,
      securityContexts,
      ticket,
    });
  } catch (err) {
    console.error(err);
    console.error('Error Performing login action');
    res.json({ status: 500, statusText: 'Unable to login' });
  }
};

module.exports = { login, logout };
