const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * 1.) With Mongoose, everything is derived from a Schema
 * 2.) An instance of a model is called a document
 */
const typesSchema = new Schema({
  // objectId: { type: Schema.Types.ObjectId, required: true },
  _id: { type: Object },
  spaceUrl: { type: String, required: true },
  objectTitle: { type: String },
  objectDescription: { type: String },
  objectAttributes: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

const TypeObject = mongoose.model('TypeObject', typesSchema);

module.exports = TypeObject;
