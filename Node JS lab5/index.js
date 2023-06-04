/* eslint-disable linebreak-style */
const express = require('express');

const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(MONGO_URL);

app.use(express.json());

app.use(routes);

// app.use((req, res) => {
//   res.send('Wrong route');
// });
app.use('*', (err, req, res, next) => {
  res.status(400).json(err);
  next();
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
