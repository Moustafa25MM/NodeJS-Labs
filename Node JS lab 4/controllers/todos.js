const Todo = require('../models/todo');

const create = (data) => Todo.create(data);

const get = (filter) => Todo.find()
  .select('title -_id')
  .sort({ _id: 1 })
  .populate('userId')
  .exec();

module.exports = {
  create,
  get,
};
