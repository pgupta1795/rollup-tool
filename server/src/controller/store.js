const TypeObject = require('../models/Types');
const Action = require('../models/Actions');
const db = require('../helper/db');

const errorCallback = (err, docs) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Updated : ', docs);
  }
};

const createTypeObject = async (req, res) => {
  try {
    const { body } = req;
    const { URL, payload } = body;
    const { title, description, cestamp, ...attributes } = payload;
    const objectId = URL.split('/').slice(-1)[0]?.split('?')[0];
    const spaceUrl = URL.split('/').slice(0, -1).join('/');
    const isTypeObjectExists = await db.isTypeObjectExists(objectId);
    const details = {
      spaceUrl: spaceUrl,
      objectTitle: title,
      objectDescription: description,
      objectAttributes: attributes,
    };

    if (isTypeObjectExists) {
      console.log(`Object with ID ${objectId} already exists in mongodb`);
      const updated = await TypeObject.findByIdAndUpdate(
        objectId,
        { $set: details },
        errorCallback
      )
        .clone()
        .exec();
      res.status(200).json(updated);
      return;
    }
    let typeObject = new TypeObject(details);
    typeObject._id = objectId;
    typeObject = await typeObject.save();
    res.status(200).json(typeObject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
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
    res.status(200).json(action);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
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
    res.status(200).json(actions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const getTypeObjectById = async (req, res) => {
  try {
    const { id } = req.query;
    const typeObject = await TypeObject.findById(id).clone().exec();
    res.status(200).json(typeObject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const updateTypeObject = async (req, res) => {
  try {
    const { id, param, value } = req.query;
    const typeObject = await TypeObject.findByIdAndUpdate(id, {
      [param]: value,
    })
      .clone()
      .exec();
    res.status(200).json(typeObject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const getTypeObjects = async (req, res) => {
  try {
    const { limit, skip, spaceUrl } = req.query;
    const typeObject = await TypeObject.find({ spaceUrl })
      .sort({ updatedAt: 'desc', createdAt: 'desc' })
      .limit(limit)
      .skip(skip)
      .exec();
    res.status(200).json(typeObject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  createTypeObject,
  createAction,
  getActions,
  getTypeObjectById,
  updateTypeObject,
  getTypeObjects,
};
