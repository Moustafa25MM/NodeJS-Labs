const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    minLength: 10,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  status: String,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
