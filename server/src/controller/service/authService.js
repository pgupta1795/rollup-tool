const https = require('https');
const axios = require('axios');
const retryFetch = require('../../helper/fetch');

const api = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const fetchLoginTicket = async (body) => {
  const { passportUrl, loginTicketURL } = body;
  const result = await retryFetch(passportUrl + loginTicketURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Connection: 'keep-alive',
    },
    retry: true,
    retryDelay: 2,
    retries: 2,
  });
  const response = await result.json();
  console.log('Login Ticket Fetched');
  if (!response && !response?.lt)
    throw new Error('Unable to generate login ticket');
  return [response, result.headers.get('set-cookie')];
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
        Connection: 'keep-alive',
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
    throw error;
  }
};

const getCsrfAndCookie = async (body, authCookie, ticket) => {
  const { spaceUrl, csrfTokenUrl } = body;
  const url = `${spaceUrl}${csrfTokenUrl}&ticket=${ticket}`;
  const result = await retryFetch(url, {
    method: 'GET',
    headers: {
      Cookie: authCookie,
      Connection: 'keep-alive',
    },
    retry: true,
    retryDelay: 2,
    retries: 2,
  });
  const response = await result.json();
  console.log('\n **** CSRF Response : ', response);
  if (!response || !response?.csrf)
    throw new Error('CSRF Token could not be fetched');
  return {
    ENO_CSRF_TOKEN: response?.csrf?.value,
    Cookies: result.headers.get('set-cookie'),
  };
};

const fetchCollabspaces = async (body, spaceCookie) => {
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
};

module.exports = {
  fetchLoginTicket,
  getCsrfAndCookie,
  fetchCollabspaces,
  casAuthentication,
};
