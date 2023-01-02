const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const mySQLConnection = require('../connection');
const router = express.Router();

router.get('/', (req, res) => {
  if (mySQLConnection) {
    console.log(mySQLConnection);
    res.json({
      message: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT and MySQL Server',
    });
  }
});

router.use('/enovia', require('../routes/authRoutes'));
router.use('/refreshToken', require('../routes/tokenRoute'));
router.use(verifyJWT);
router.use('/enovia', require('../routes/enoviaRoutes'));
router.use('/store', require('../routes/typeObjectRoutes'));
router.use('/store', require('../routes/actionRoutes'));

module.exports = router;
