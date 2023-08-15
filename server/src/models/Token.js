const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = model('Token', tokenSchema);
module.exports = Token;
