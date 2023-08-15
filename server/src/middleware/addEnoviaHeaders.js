const jwt = require('jsonwebtoken');

const addEnoviaHeaders = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(`**** Error : Verify if Access Token is valid **** \n`);
        console.log(`${err.name} : ${err.message} on ${err.expiredAt}`);
        res.status(403).json({ message: err });
        return;
      }
      req.body.headers = {
        ...req.body.headers,
        ENO_CSRF_TOKEN: decoded.ENO_CSRF_TOKEN,
        Cookie: decoded.Cookie,
      };
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

module.exports = addEnoviaHeaders;
