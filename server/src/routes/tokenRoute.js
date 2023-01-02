const express = require('express');
const router = express.Router();
const tokenController = require('../controller/token');

router.get('/', tokenController.refreshToken);

module.exports = router;
