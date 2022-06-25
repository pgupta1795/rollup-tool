const mongoose = require('mongoose');

//rollup at end of url represents database name we will use for our application
const url = process.env.DB_URL || 'mongodb://localhost:27017/rollup';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(url, options).catch((err) => console.log(err));

const connection = mongoose.connection;
connection.on('open', () => console.log('Database Connection Successfull'));
connection.on('error', (err) => console.log(err));

module.exports = connection;
