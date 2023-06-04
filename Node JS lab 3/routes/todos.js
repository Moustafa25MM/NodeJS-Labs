/* eslint-disable linebreak-style */
const express = require('express');
const fs = require('fs');

const router = express.Router();

const todos = JSON.parse(fs.readFileSync('./todos.json', 'utf-8'));

router.get('/view', (req, res) => {
  res.render('index', { todos });
});

router.get('/', (req, res) => {
  if (!req.query.status) {
    res.json(todos);
    return;
  }
  const filterdTodo = todos.filter((todo) => todo.status === req.query.status);
  res.json(filterdTodo);
});
router.get('/:id', (req, res) => {
  const todo = todos.find((todoElement) => todoElement.id === Number(req.params.id));
  if (!todo) {
    res.status(400).send('Todo not found');
    return;
  }
  res.json(todo);
});
router.get('/:status', (req, res) => {
  const todo = todos.find((todoElement) => todoElement.status === req.params.status);
  if (!todo) {
    res.status(400).send('Status not found');
    return;
  }
  res.json(todo);
});
router.post('/', (req, res) => {
  if (!req.body.title) {
    res.status(400).send('Enter the title of the TODO');
    return;
  }
  const id = todos.length > 0 ? (todos[todos.length - 1].id) + 1 : 1;
  if (req.body.status) {
    if (!['to-do', 'done', 'in-progress'].includes(req.body.status)) {
      res.status(400).send('status must be in [to-do,done,progress] --> it will be to-do by default now');
      req.body.status = 'to-do';
    }
  } else {
    req.body.status = 'to-do';
  }
  todos.push({
    id,
    title: req.body.title,
    status: req.body.status,
  });
  fs.writeFileSync('./todos.json', JSON.stringify(todos));
  res.status(204).send('Todo Created Successfully');
});
router.delete('/:id', (req, res) => {
  const todo = todos.filter((todoElement) => todoElement.id !== Number(req.params.id));
  if (todo.length === todos.length) {
    res.status(400).send('TODO not found');
    return;
  }
  fs.writeFileSync('./todos.json', JSON.stringify(todo));
  res.status(204).send('todo id deleted successfully');
});
router.patch('/:id', (req, res) => {
  const todo = todos.find((todoElement) => todoElement.id === Number(req.params.id));
  if (!todo) {
    res.status(400).send('Todo not Found');
    return;
  }
  if (!req.body.title && !req.body.status) {
    res.status(400).send('you must edit title or status');
    return;
  }
  if (req.body.title) {
    todo.title = req.body.title;
  }
  if (req.body.status) {
    if (!['todo', 'done', 'in-progress'].includes(req.body.status)) {
      res.status(400).send('value of status must in [todo , done , in-progress]');
      return;
    }
    todo.status = req.body.status;
  }
  fs.writeFileSync('./todos.json', JSON.stringify(todos));
  res.status(204).send('todo is updated successfully');
});

module.exports = router;
