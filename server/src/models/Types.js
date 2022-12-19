const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * 1.) With Mongoose, everything is derived from a Schema
 * 2.) An instance of a model is called a document
 */
const typesSchema = new Schema({
  _id: { type: Object },
  spaceUrl: { type: String, required: true },
  objectTitle: { type: String },
  objectDescription: { type: String },
  objectAttributes: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },

  sumActualMass: { type: Schema.Types.Decimal128, default: 0.0 },
  sumCalculatedMass: { type: Schema.Types.Decimal128, default: 0.0 },
  sumEstimatedMass: { type: Schema.Types.Decimal128, default: 0.0 },
  bestAvailable: { type: Schema.Types.Decimal128, default: 0.0 },
  bestAvailableV2: { type: Schema.Types.Decimal128, default: 0.0 },

  usage: { type: String },
  endItem: { type: Schema.Types.Boolean },
});

const TypeObject = mongoose.model('TypeObject', typesSchema);

module.exports = TypeObject;
