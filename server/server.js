const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const EnoviaRoutes = require("./src/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", EnoviaRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
