/* eslint-disable linebreak-style */
const express = require('express');
const { todosController } = require('../controllers');
const { asycnWrapper } = require('../lib');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {
    body: {
      title, status, tags, userId,
    },
  } = req;
  const todo = todosController.create({
    title, status, tags, userId,
  });
  const [error, data] = await asycnWrapper(todo);
  if (error) return next(error);
  return res.status(200).json({
    message: 'Todo was Created successfully',
    todo: data,
  });
});

router.patch('/:id', async (req, res, next) => {
  const {
    body:
     {
       title, status, tags,
     },
    params: {
      id,
    },
  } = req;

  const updatedUser = todosController.updateById(id, {
    title, status, tags,
  });
  const [error, data] = await asycnWrapper(updatedUser);
  if (error) return next(error);
  if (!data) {
    return res.status(400).json('Todo Not Found');
  }
  return res.status(200).json({
    message: 'Todo was edited successfully',
    todo: data,
  });
});

router.delete('/:id', async (req, res, next) => {
  const {
    params: {
      id,
    },
  } = req;
  const todo = todosController.deleteById(id);
  const [error, data] = await asycnWrapper(todo);
  if (error) return next(error);
  if (!data) {
    return res.status(400).json('Todo Not Found');
  }
  return res.status(200).json({
    message: 'Todo was Delteted successfully',
    todo: data,
  });
});

router.get('/', async (req, res, next) => {
  const { query: { limit, skip, status } } = req;
  const todos = todosController.get({ limit, skip, status });
  const [error, data] = await asycnWrapper(todos);
  if (error) return next(error);
  return res.status(200).json(data);
});

module.exports = router;
