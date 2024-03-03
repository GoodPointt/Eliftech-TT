const { ctrlWrapper } = require('../../utils');

const createOrder = require('./createOrder');
const getOrders = require('./getOrders');

module.exports = {
  createOrder: ctrlWrapper(createOrder),
  getOrders: ctrlWrapper(getOrders),
};
