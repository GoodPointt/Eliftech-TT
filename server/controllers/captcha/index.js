const { ctrlWrapper } = require('../../utils');
const getCaptcha = require('./getCaptcha');
const checkCaptcha = require('./checkCaptcha');

module.exports = {
  getCaptcha: ctrlWrapper(getCaptcha),
  checkCaptcha: ctrlWrapper(checkCaptcha),
};
