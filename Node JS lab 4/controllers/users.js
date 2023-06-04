const User = require('../models/user');

const create = (data) => User.create(data);

module.exports = {
  create,
};
