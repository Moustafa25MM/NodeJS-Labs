/* eslint-disable linebreak-style */
const { Todo } = require('../models/todo');
const { Counter } = require('../models/todo');

const create = async (todo) => {
  const counter = await Counter.findOneAndUpdate({ id: 'userid' }, { $inc: { seq: 1 } }, { new: true });
  let id;

  if (counter) {
    id = counter.seq;
  } else {
    id = 1;
    const firstdoc = new Counter({
      id: 'userid',
      seq: 1,
    });
    firstdoc.save();
  }
  // eslint-disable-next-line no-param-reassign
  todo.id = id;
  return Todo.create(todo);
};

const get = (filters) => Todo.find({ status: filters.status })
  .skip(filters.skip || 0)
  .limit(filters.limit || 10)
  .populate('userId')
  .exec();

const updateById = (id, values) => Todo.findByIdAndUpdate(id, values, { returnDocument: 'after', runValidators: true });

const deleteById = (id) => Todo.findByIdAndRemove(id);

module.exports = {
  create,
  get,
  updateById,
  deleteById,
};
