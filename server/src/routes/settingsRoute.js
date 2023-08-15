const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post('/update', (req, res) => {
  try {
    const newJson = req.body;
    const jsonPath = path.join(__dirname, '../../../client/src/Settings.json');
    fs.writeFile(jsonPath, JSON.stringify(newJson), (err) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      console.log('Done writing');
      res.status(200).json(newJson);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
