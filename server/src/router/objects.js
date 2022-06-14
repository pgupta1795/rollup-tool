const https = require("https");
const axios = require("axios");
const api = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const searchobjects = async (req, res) => {
  try {
    const body = req.body;
    const headers = body.headers;
    const spaceUrl = body.BASE_URL;
    const endpoint = body.GET_ENDPOINT;

    const response = await api.get(spaceUrl + endpoint, {
      headers: headers,
    });
    res.json({ status: response.status, data: response.data });
  } catch (err) {
    console.error(err);
    res.json({ status: 500, message: err, data: {} });
  }
};

const getAllChildren = async (req, res) => {
  try {
    const {
      body: { ID, BASE_URL, GET_ENDPOINT, CHILD_ENDPOINT, headers },
    } = req;
    if (ID && BASE_URL && GET_ENDPOINT && CHILD_ENDPOINT && headers) {
      const objectData = await getObjectDetails(
        ID,
        BASE_URL,
        GET_ENDPOINT,
        CHILD_ENDPOINT,
        headers
      );
      res.json({ status: 200, data: objectData });
    }
  } catch (error) {
    console.error(err);
    res.json({ status: 500 });
  }
};

const getObjectDetails = async (
  id,
  BASE_URL,
  GET_ENDPOINT,
  CHILD_ENDPOINT,
  headers
) => {
  const objectData = { data: {}, children: [] };
  try {
    const url = BASE_URL + GET_ENDPOINT.replace("{}", id);
    const { data, status } = await api.get(url, {
      headers: headers,
    });
    if (status === 200 && data?.totalItems > 0) {
      objectData.data = data;
      const children = await fetchChildren(
        id,
        BASE_URL,
        GET_ENDPOINT,
        CHILD_ENDPOINT,
        headers
      );
      objectData.children = children;
    }
  } catch (error) {
    console.log("Error in getObjectDetails function : " + error);
  }
  return objectData;
};

const fetchChildren = async (
  id,
  BASE_URL,
  GET_ENDPOINT,
  CHILD_ENDPOINT,
  headers
) => {
  const children = [];
  try {
    const url = BASE_URL + CHILD_ENDPOINT.replace("{}", id);
    const { data, status } = await api.get(url, {
      headers: headers,
    });

    if (status === 200 && data?.totalItems > 0) {
      const { member } = data;
      await Promise.all(
        member.map(async ({ referencedObject: { id: childId } }) => {
          const objDetails = await getObjectDetails(
            childId,
            BASE_URL,
            GET_ENDPOINT,
            CHILD_ENDPOINT,
            headers
          );
          children.push(objDetails);
        })
      );
    }
  } catch (error) {
    console.log("Error in fetchChildren function : " + error);
  }
  return children;
};

const updateObject = async (req, res) => {
  try {
    const body = req.body;
    const headers = body.headers;
    const url = body.URL;
    const payload = body.payload;

    const response = await api.patch(url, payload, {
      headers: headers,
    });
    res.json({ status: response.status, data: response.data });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
};

module.exports = { searchobjects, getAllChildren, updateObject };
