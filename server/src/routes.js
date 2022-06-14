const express = require("express");
const enovia = require("./router/enovia.js");
const objects = require("./router/objects.js");
const mySQLConnection = require("./connection");

const Router = express.Router();

Router.get("/", (req, res) => {
  if (mySQLConnection) {
    console.log(mySQLConnection);
    res.json({
      message: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT and MySQL Server",
    });
  }
});

Router.post("/api/enovia/login", (req, res) => {
  enovia.login(req, res);
});

Router.post("/api/enovia/searchobjects", (req, res) => {
  objects.searchobjects(req, res);
});

Router.post("/api/enovia/getAllChildren", (req, res) => {
  objects.getAllChildren(req, res);
});

Router.post("/api/enovia/updateObject", (req, res) => {
  objects.updateObject(req, res);
});

module.exports = Router;
