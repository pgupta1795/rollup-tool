const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const mySQLConnection = require('../connection');
const router = express.Router();

router.get('/api', (req, res) => {
  if (mySQLConnection) {
    console.log(mySQLConnection);
    res.json({
      message: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT and MySQL Server',
    });
  }
});

router.use('/api/enovia', require('../routes/authRoutes'));
router.use('/api/refreshToken', require('../routes/tokenRoute'));
router.use(verifyJWT);
router.use('/api/enovia', require('../routes/enoviaRoutes'));
router.use('/api/store', require('../routes/typeObjectRoutes'));
router.use('/api/store', require('../routes/actionRoutes'));

module.exports = router;
