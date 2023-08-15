const express = require('express');
const router = express.Router();
const storeController = require('../controller/store');

router.post('/createTypeObject', storeController.createTypeObject);

router.get('/getTypeObjectById', storeController.getTypeObjectById);

router.get('/updateTypeObject', storeController.updateTypeObject);

router.get('/getTypeObjects', storeController.getTypeObjects);

module.exports = router;
