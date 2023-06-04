const express = require('express');
const { todosController } = require('../controllers');
const asycnWrapper = require('../lib');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body: { title, status, userId } } = req;
  const todo = todosController.create({ title, status, userId });
  const [err, data] = await asycnWrapper(todo);
  if (err) return next(err);
  return res.json(data);
});

router.get('/', async (req, res, next) => {
  const { query: { title } } = req;
  const [err, data] = await asycnWrapper(todosController.get({ title }));
  if (err) return next(err);
  return res.json(data);
});

module.exports = router;
