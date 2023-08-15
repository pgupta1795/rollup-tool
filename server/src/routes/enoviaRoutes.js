const express = require('express');
const router = express.Router();
const enoviaObjectsController = require('../controller/objects');
const zoneQueryController = require('../controller/zoneQuery');
const addEnoviaHeaders = require('../middleware/addEnoviaHeaders');

router.post(
  '/searchobjects',
  addEnoviaHeaders,
  enoviaObjectsController.searchobjects
);

router.post(
  '/getAllChildren',
  addEnoviaHeaders,
  enoviaObjectsController.getAllChildren
);

router.post(
  '/getAllChildrenByZoneQuery',
  addEnoviaHeaders,
  zoneQueryController.getAllChildrenByZoneQuery
);

router.post(
  '/updateObject',
  addEnoviaHeaders,
  enoviaObjectsController.updateObject
);

module.exports = router;
