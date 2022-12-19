require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const EnoviaRoutes = require('./src/routes');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/', EnoviaRoutes);

// render client
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`\u{1F525}\u{1F680} Listening on port ${port} \u{1F525}\u{1F680}`)
);
