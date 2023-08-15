const db = require('../helper/db');
const retryFetch = require('../helper/fetch');
const request = require('request');

const getEngItem = (attributes) => {
  const result = {};
  const enterpriseAttributes = {};

  for (const attribute of attributes) {
    const attributeName = attribute.name.replace(/^(ds6w:|ds6wg:)/, ''); // Remove "ds6w:" or "ds6wg:" prefix
    if (attributeName.includes('XP_VPMReference_Ext')) {
      enterpriseAttributes[attributeName.replace('XP_VPMReference_Ext.', '')] =
        attribute.value;
    } else if (attributeName === 'physicalId') {
      result['id'] = attribute.value;
    } else if (attributeName === 'label') {
      result['title'] = attribute.value;
    } else if (attributeName === 'current') {
      result['state'] = attribute.value;
    } else {
      result[attributeName] = attribute.value;
    }
  }

  if (Object.keys(enterpriseAttributes).length > 0) {
    result['dseno:EnterpriseAttributes'] = enterpriseAttributes;
  }
  return result;
};

function buildTree(didEngItems, paths, currentDid, visited = new Set()) {
  const currentNode = didEngItems[currentDid];
  if (!currentNode || visited.has(currentDid)) {
    return null;
  }
  visited.add(currentDid);

  const children = paths
    .filter((path) => path.dids.includes(currentDid))
    .flatMap((path) => {
      const currentIndex = path.dids.indexOf(currentDid);
      const childDids = path.dids.slice(currentIndex + 1);
      return childDids;
    })
    .map((childDid) => buildTree(didEngItems, paths, childDid, visited));

  return {
    data: { member: [{ ...currentNode }] },
    children: children.filter((child) => child !== null)
  };
}

const getStructure = (didEngItems, paths) => {
  const rootDids = paths.map((path) => path.dids[0]);
  const uniqueTrees = new Map();
  rootDids.forEach((rootDid) => {
    const tree = buildTree(didEngItems, paths, rootDid);
    if (tree !== null && !uniqueTrees.has(tree.did))
      uniqueTrees.set(tree.did, tree);
  });
  const uniqueTreeArray = Array.from(uniqueTrees.values());
  if (uniqueTreeArray.length !== 1)
    throw new Error('Unable to get the structure of object');
  return uniqueTreeArray[0];
};

async function addExtraProperties(obj, BASE_URL) {
  const typeObject = await db.createOrFetchTypeObject(
    obj.data.member[0].id,
    obj,
    BASE_URL
  );
  if (typeObject) {
    obj.data.member[0].endItem = typeObject.endItem;
    obj.data.member[0].usage = typeObject.usage;
  }

  if (obj.children && obj.children.length > 0) {
    // for (const child of obj.children) {
    //   await addExtraProperties(child, BASE_URL);
    // }
    await Promise.all(
      obj.children.map((child) => addExtraProperties(child, BASE_URL))
    );
  }
}

const getAllChildrenByZoneQuery = async (req, res) => {
  try {
    const {
      body: {
        ID,
        BASE_URL,
        CHILD_ENDPOINT,
        headers,
        tenant,
        ZONE_QUERY_PAYLOAD
      }
    } = req;
    if (
      !ID ||
      !BASE_URL ||
      !CHILD_ENDPOINT ||
      !headers ||
      !tenant ||
      !ZONE_QUERY_PAYLOAD
    )
      throw new Error('Invalid Payload Provided');

    //fetch data using zoneQuery
    let objectData = { data: {} };
    const url =
      BASE_URL + CHILD_ENDPOINT.replace('{}', ID).replace('{}', tenant);

    const zoneQPayload = {
      ...ZONE_QUERY_PAYLOAD,
      root_path_physicalid: [`${ID}`]
    };

    const result = await retryFetch(url, {
      method: 'POST',
      headers,
      retry: true,
      retryDelay: 2,
      retries: 2,
      body: JSON.stringify(zoneQPayload)
    });
    const data = await result.json();
    const status = result.status;
    if (status !== 200 && data?.totalItems < 1) throw new Error(data);

    if (!data.hasOwnProperty('results')) throw new Error('No results found');
    const didEngItems = {};
    const instances = {};
    const paths = [];
    const { results } = data;

    //process each result corresponding to each engineering item / instance
    for (let i = 0; i < results.length; i++) {
      const jsonResult = results[i];

      if (jsonResult.hasOwnProperty('attributes')) {
        const attributes = jsonResult.attributes;

        //process for type VPMref or VPMins
        if (attributes.length === 0 || attributes.length < 2) continue;
        const vpmType = attributes[1].value;

        if (vpmType === 'VPMReference') {
          const engItem = getEngItem(attributes);
          didEngItems[engItem.did] = engItem;
        } else if (vpmType === 'VPMInstance') {
          const engInstance = getEngItem(attributes);
          instances[engInstance.did] = engInstance;
        }
      } else if (jsonResult.hasOwnProperty('path')) {
        const jsonPath = jsonResult.path;
        const path = { dids: [] };
        for (let j = 0; j < jsonPath.length; j++)
          path.dids.push(jsonPath[j].toString());
        paths.push(path);
      }
    }

    // add children also related to eng item
    // objectData.data = {
    //   member: [getStructure(didEngItems, paths)]
    // };
    objectData = getStructure(didEngItems, paths);
    //add/create an object using the same information fetched in local DB
    await addExtraProperties(objectData, BASE_URL);
    res.status(200).json(objectData);
  } catch (error) {
    console.error(error);
    res
      .status(error.type === 'invalid-json' ? 403 : 500)
      .json({ message: error?.message || error });
  }
};

module.exports = { getAllChildrenByZoneQuery };
