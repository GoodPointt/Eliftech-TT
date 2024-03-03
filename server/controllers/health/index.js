const { ctrlWrapper } = require('../../utils');
const healthCheck = require('./healthCheck');

module.exports = {
  healthCheck: ctrlWrapper(healthCheck),
};
