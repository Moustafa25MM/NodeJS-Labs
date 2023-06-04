/* eslint-disable linebreak-style */
const User = require('../models/user');
const { Todo } = require('../models/todo');

const register = (data) => User.create(data);

const getFirstName = () => User.find().select({ firstName: 1, _id: 0 });

const deleteById = (id) => User.findByIdAndRemove(id);

const updateById = (id, values) => User.findByIdAndUpdate(id, values, { returnDocument: 'after' });

const getUserTodos = (id) => Todo.find({ userId: id }).populate('userId');

module.exports = {
  register,
  getFirstName,
  deleteById,
  updateById,
  getUserTodos,
};
