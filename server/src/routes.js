const express = require('express');
const enovia = require('./router/enovia');
const objects = require('./router/objects');
const store = require('./router/store');
const mySQLConnection = require('./connection');

const Router = express.Router();

Router.get('/', (req, res) => {
  if (mySQLConnection) {
    console.log(mySQLConnection);
    res.json({
      message: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT and MySQL Server',
    });
  }
});

Router.post('/api/enovia/login', (req, res) => {
  enovia.login(req, res);
});

Router.post('/api/enovia/logout', (req, res) => {
  enovia.logout(req, res);
});

Router.post('/api/enovia/searchobjects', (req, res) => {
  objects.searchobjects(req, res);
});

Router.post('/api/enovia/getAllChildren', (req, res) => {
  objects.getAllChildren(req, res);
});

Router.post('/api/enovia/updateObject', (req, res) => {
  objects.updateObject(req, res);
});

Router.post('/api/store/createTypeObject', (req, res) =>
  store.createTypeObject(req, res)
);

Router.post('/api/store/createAction', (req, res) =>
  store.createAction(req, res)
);

Router.get('/api/store/getActions', (req, res) => store.getActions(req, res));

Router.get('/api/store/getTypeObjectById', (req, res) =>
  store.getTypeObjectById(req, res)
);

Router.get('/api/store/updateTypeObject', (req, res) =>
  store.updateTypeObject(req, res)
);

module.exports = Router;
