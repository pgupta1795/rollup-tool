const jwt = require('jsonwebtoken');
const TokenModel = require('../../models/Token');

const generateAccessToken = (details) => {
  const token = jwt.sign(details, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  console.log(
    `**** New Access Token Generated for ${details.firstname} ${details.lastname} ****`
  );
  return token;
};

const generateRefreshToken = (details) => {
  const token = jwt.sign(details, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  console.log(`**** New Refresh Token Generated for ${details.username} ****`);
  return token;
};

const findTokenByUserId = async (username) => {
  return await TokenModel.findOne({ username });
};

const createToken = async (username, token) => {
  const tokenObject = await new TokenModel({
    username,
    token,
  }).save();
  return tokenObject;
};

const deleteToken = async (username) => {
  try {
    const currentToken = await findTokenByUserId(username);
    if (currentToken) await currentToken.deleteOne();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateNewToken = async (username, token) => {
  try {
    const currentToken = await findTokenByUserId(username);
    if (currentToken) return currentToken;
    return await createToken(username, token);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  findTokenByUserId,
  deleteToken,
  generateNewToken,
};
