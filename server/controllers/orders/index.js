const { ctrlWrapper } = require('../../utils');

const createOrder = require('./createOrder');

module.exports = {
  createOrder: ctrlWrapper(createOrder),
};
