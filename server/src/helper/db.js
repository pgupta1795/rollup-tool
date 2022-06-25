const TypeObject = require('../models/Types');

const isTypeObjectExists = async (id) => {
  try {
    const object = await TypeObject.findById(id).exec();
    return object != null || object ? true : false;
  } catch (error) {
    console.log(error);
    return true;
  }
};

module.exports = { isTypeObjectExists };
