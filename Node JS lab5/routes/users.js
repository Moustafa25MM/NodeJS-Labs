/* eslint-disable linebreak-style */
const express = require('express');
const { usersController } = require('../controllers');
const { asycnWrapper } = require('../lib');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {
    body:
     {
       userName, firstName, lastName, dob,
     },
  } = req;
  const user = usersController.register(
    {
      userName, firstName, lastName, dob,
    },
  );
  const [error, data] = await asycnWrapper(user);
  if (error) return next(error);
  return res.status(200).json({
    message: 'User was Register successfully',
    user: data,
  });
});

router.get('/', async (req, res, next) => {
  const users = usersController.getFirstName();
  const [error, data] = await asycnWrapper(users);
  if (error) return next(error);
  return res.status(200).json(data);
});

router.delete('/:id', async (req, res, next) => {
  const {
    params: {
      id,
    },
  } = req;
  const user = usersController.deleteById(id);
  const [error, data] = await asycnWrapper(user);
  if (error) return next(error);
  if (!data) {
    res.status(400).json('User Not Found');
  }
  return res.status(200).json({
    message: 'User was Deleted successfully',
    user: data,
  });
});

router.patch('/:id', async (req, res, next) => {
  const {
    body:
     {
       userName, firstName, lastName, dob,
     },
    params: {
      id,
    },
  } = req;

  const updatedUser = usersController.updateById(id, {
    userName, firstName, lastName, dob,
  });
  const [error, data] = await asycnWrapper(updatedUser);
  if (error) return next(error);
  if (!data) {
    return res.status(400).json('User Not Found');
  }
  return res.status(200).json({
    message: 'User was edited successfully',
    user: data,
  });
});

router.get('/:id/todos', async (req, res, next) => {
  const {
    params: {
      id,
    },
  } = req;
  const todo = usersController.getUserTodos(id);
  const [error, data] = await asycnWrapper(todo);
  if (error) return next(error);
  if (!data) {
    return res.status(400).json('Todo Not Found');
  }
  return res.status(200).json({
    todo: data,
  });
});

module.exports = router;
