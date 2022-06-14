const https = require("https");
const axios = require("axios");
const api = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const fetchLoginTicket = async (body) => {
  try {
    const passportUrl = body.passportUrl;
    const loginTicketURL = body.loginTicketURL;
    const response = await api.get(passportUrl + loginTicketURL, {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const casAuthentication = async (ltResponse, body, passportCookie) => {
  try {
    const username = body.username;
    const password = body.password;
    const passportUrl = body.passportUrl;
    const spaceUrl = body.spaceUrl;
    const casAuthUrl = body.casAuthUrl;
    let casAuthBody = body.casAuthBody;
    casAuthBody = casAuthBody
      .replace("{}", ltResponse.lt)
      .replace("{}", username)
      .replace("{}", password);
    const casResponse = await api({
      url: passportUrl + casAuthUrl.replace("{}", spaceUrl),
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: passportCookie,
      },
      data: casAuthBody,
    });
    return casResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchCSRF = async (body, spaceCookie) => {
  try {
    console.log("spaceCookie : " + spaceCookie);
    const spaceUrl = body.spaceUrl;
    const csrfTokenUrl = body.csrfTokenUrl;
    const response = await api({
      url: spaceUrl + csrfTokenUrl,
      method: "get",
      headers: {
        Cookie: spaceCookie,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchCollabspaces = async (body, spaceCookie) => {
  try {
    const response = await api({
      url: body.spaceUrl + body.collabspaceUrl,
      method: "get",
      headers: {
        Cookie: spaceCookie,
      },
    });
    const responseData = response.data;
    if (!responseData?.firstname) {
      return {
        firstname: "",
        lastname: "",
        preferred: "",
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

    //Role.Company.Collabspace
    let securityContexts = [];
    collabspaces.forEach(({ name: aCollabspace, couples }) => {
      couples.forEach(
        ({
          organization: { name: aOrganization } = {},
          role: { name: aRole } = {},
        }) => {
          securityContexts.push([aRole, aOrganization, aCollabspace].join("."));
        }
      );
    });

    return {
      firstname: firstname,
      lastname: lastname,
      preferred: [pRole, pOrganization, pCollabspace].join("."),
      securityContexts: securityContexts,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//generate login ticket, perform cas authentication, generate csrf-token and then generate all security contexts related to the logged in person
const login = async (req, res) => {
  try {
    const loginResponse = await fetchLoginTicket(req.body);
    const ltResponse = loginResponse.data;
    if (!ltResponse && !ltResponse?.lt) {
      throw "Unable to generate login ticket";
    }

    const passportCookie = loginResponse.headers["set-cookie"];
    const casResponse = await casAuthentication(
      ltResponse,
      req.body,
      passportCookie
    );

    const spaceCookie = casResponse.headers["set-cookie"];
    const csrfResponse = await fetchCSRF(req.body, spaceCookie);

    const { firstname, lastname, preferred, securityContexts } =
      await fetchCollabspaces(req.body, spaceCookie);

    res.json({
      status: csrfResponse.status,
      statusText: csrfResponse.statusText,
      headers: csrfResponse.headers,
      data: csrfResponse.data,
      "set-cookie": spaceCookie,
      firstname: firstname,
      lastname: lastname,
      preferred: preferred,
      securityContexts: securityContexts,
    });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
};

module.exports = { login };
