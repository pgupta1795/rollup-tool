const TypeObject = require('../models/Types');

const errorCallback = (err, docs) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Updated : ', docs);
  }
};

const isTypeObjectExists = async (id) => {
  try {
    const object = await TypeObject.findById(id).exec();
    return object != null || object ? true : false;
  } catch (error) {
    console.log(error);
    return true;
  }
};

const createOrFetchTypeObject = async (id, objectData, BASE_URL) => {
  if (!objectData) return null;
  let typeObject;
  const usageValue = objectData?.children?.length > 0 ? 'Assembly' : '3DPart';
  const object = await TypeObject.findById(id).exec();
  const exists = object != null || object ? true : false;
  if (exists) {
    const endItemValue =
      object?.endItem !== undefined ? object?.endItem : usageValue === '3DPart';
    const data = {
      usage: usageValue,
      endItem: endItemValue,
    };
    typeObject = await TypeObject.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        upsert: true,
      },
      errorCallback
    )
      .clone()
      .exec();
    console.log('UPDATED TYPE OBJECT : ', typeObject);
  } else {
    const endItemValue = usageValue === '3DPart';
    const data = {
      usage: usageValue,
      endItem: endItemValue,
      spaceUrl: BASE_URL,
      objectTitle: objectData?.data?.member[0]?.title,
      objectDescription: objectData?.data?.member[0]?.description,
    };
    typeObject = new TypeObject(data);
    typeObject._id = id;
    typeObject = await typeObject.save();
    console.log('CREATED TYPE OBJECT : ', typeObject);
  }
  return typeObject;
};

module.exports = { isTypeObjectExists, createOrFetchTypeObject };
