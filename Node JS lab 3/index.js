/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
const routes = require('./routes');

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.static('./public'));
app.use(routes);

app.get('/astronomy/download', (req, res) => {
  res.download('./public/astronomy.jpg');
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is up and running :localhost:${PORT}`);
});
