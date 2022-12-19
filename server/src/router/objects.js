const db = require('../helper/db');
const retryFetch = require('../helper/fetch');
const request = require('request');

const searchobjects = async (req, res) => {
  try {
    const { body } = req;
    const { headers, BASE_URL, GET_ENDPOINT } = body;
    const url = BASE_URL + GET_ENDPOINT;
    const result = await retryFetch(url, {
      method: 'GET',
      headers,
      retry: true,
      retryDelay: 2,
      retries: 3,
    });
    const response = await result.json();
    res.json({
      status: result.status || response.status,
      data: response.data || response,
    });
  } catch (err) {
    console.error(err);
    console.error('Error performing enovia objects search');
    res.json({ status: 500 });
  }
};

const getObjectDetails = async (
  id,
  BASE_URL,
  GET_ENDPOINT,
  CHILD_ENDPOINT,
  headers,
  tenant
) => {
  const objectData = { data: {}, children: [] };
  try {
    const url = BASE_URL + GET_ENDPOINT.replace('{}', id).replace('{}', tenant);
    const result = await retryFetch(url, {
      method: 'GET',
      headers,
      retry: true,
      retryDelay: 2,
      retries: 2,
    });
    const data = await result.json();
    const status = result.status;
    if (status === 200 && data?.totalItems > 0) {
      objectData.data = data;
      const children = await fetchChildren(
        id,
        BASE_URL,
        GET_ENDPOINT,
        CHILD_ENDPOINT,
        headers,
        tenant
      );
      objectData.children = children;

      const typeObject = await db.createOrFetchTypeObject(
        id,
        objectData,
        BASE_URL
      );
      if (typeObject) {
        objectData.data.member[0].endItem = typeObject.endItem;
        objectData.data.member[0].usage = typeObject.usage;
      }
    }
  } catch (error) {
    console.log(`Error in getObjectDetails function : ${error}`);
  }
  return objectData;
};

const fetchChildren = async (
  id,
  BASE_URL,
  GET_ENDPOINT,
  CHILD_ENDPOINT,
  headers,
  tenant
) => {
  const children = [];
  try {
    const url =
      BASE_URL + CHILD_ENDPOINT.replace('{}', id).replace('{}', tenant);
    const result = await retryFetch(url, {
      method: 'GET',
      headers,
      retry: true,
      retryDelay: 2,
      retries: 2,
    });
    const data = await result.json();
    const status = result.status;

    if (status === 200 && data?.totalItems > 0) {
      const { member } = data;
      await Promise.all(
        member.map(async ({ referencedObject: { id: childId } }) => {
          const objDetails = await getObjectDetails(
            childId,
            BASE_URL,
            GET_ENDPOINT,
            CHILD_ENDPOINT,
            headers,
            tenant
          );
          children.push(objDetails);
        })
      );
    }
  } catch (error) {
    console.log(`Error in fetchChildren function : ${error}`);
  }
  return children;
};

const getAllChildren = async (req, res) => {
  try {
    const {
      body: { ID, BASE_URL, GET_ENDPOINT, CHILD_ENDPOINT, headers, tenant },
    } = req;
    if (ID && BASE_URL && GET_ENDPOINT && CHILD_ENDPOINT && headers && tenant) {
      const objectData = await getObjectDetails(
        ID,
        BASE_URL,
        GET_ENDPOINT,
        CHILD_ENDPOINT,
        headers,
        tenant
      );
      res.json({ status: 200, data: objectData });
    }
  } catch (error) {
    console.error(error);
    res.json({ status: 500 });
  }
};

const updateObject = async (req, res) => {
  try {
    const { body } = req;
    let { headers, URL, payload } = body;

    const options = {
      url: URL,
      json: true,
      method: 'PATCH',
      followRedirect: true,
      followAllRedirects: true,
      headers: {
        ...headers,
        Accept: 'application/json',
        method: 'PATCH',
        scheme: 'https',
        pragma: 'no-cache',
      },
      body: payload,
    };

    request(options, (error, response, body) => {
      if (!error) {
        console.log(body);
        res.json({
          status: response.statusCode,
          data: body,
          message: body.message || response.statusMessage,
        });
      } else {
        console.log('Error');
      }
    });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
};

module.exports = { searchobjects, getAllChildren, updateObject };
