const TypeObject = require('../models/Types');
const Action = require('../models/Actions');
const db = require('../helper/db');

const createTypeObject = async (req, res) => {
  try {
    const { body } = req;
    const { URL, payload } = body;
    const { title, description, cestamp, ...attributes } = payload;
    const objectId = URL.split('/').slice(-1)[0];
    const spaceUrl = URL.split('/').slice(0, -1).join('/');
    const isTypeObjectExists = await db.isTypeObjectExists(objectId);

    if (isTypeObjectExists) {
      console.log(`Object with ID ${objectId} already exists in mongodb`);
      res.json({ status: 400 });
      return;
    }
    let typeObject = new TypeObject({
      spaceUrl: spaceUrl,
      objectTitle: title,
      objectDescription: description,
      objectAttributes: attributes,
    });
    typeObject._id = objectId;
    typeObject = await typeObject.save();
    res.json({ status: 200, data: typeObject });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
};

const createAction = async (req, res) => {
  try {
    const { objectId, spaceUrl, userName, oldObject, newObject } = req.body;
    const {
      children: oldChildren,
      key: oldkey,
      id: oldId,
      parent: oldParent,
      ...objectOldDetails
    } = JSON.parse(oldObject);
    const { children, key, id, parent, ...objectNewDetails } =
      JSON.parse(newObject);

    let action = new Action({
      spaceUrl,
      userName,
      objectId,
      objectOldDetails,
      objectNewDetails,
    });
    action = await action.save();
    res.json({ status: 200, data: action });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
};

const getActions = async (req, res) => {
  try {
    const { limit, skip, spaceUrl, userName } = req.query;
    const actions = await Action.find({
      spaceUrl,
      userName,
    })
      .limit(limit)
      .skip(skip)
      .exec();
    res.json({ status: 200, data: actions });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
};

module.exports = { createTypeObject, createAction, getActions };
