const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  res.status(400).json(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Up: localhost:${PORT}`);
});
