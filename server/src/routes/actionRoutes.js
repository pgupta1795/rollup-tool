const express = require('express');
const router = express.Router();
const storeController = require('../controller/store');

router.post('/createAction', storeController.createAction);

router.get('/getActions', storeController.getActions);

module.exports = router;
