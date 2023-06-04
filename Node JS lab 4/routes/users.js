const express = require('express');
const { usersController } = require('../controllers');
const asycnWrapper = require('../lib');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body: { firstName } } = req;
  const [err, user] = await asycnWrapper(usersController.create({ firstName }));
  if (err) return next(err);
  return res.json(user);
});
module.exports = router;
