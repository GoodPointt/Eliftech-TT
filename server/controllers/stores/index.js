const { ctrlWrapper } = require('../../utils');
const listAll = require('./listAll');
const addNew = require('./addNew');

module.exports = {
  listAll: ctrlWrapper(listAll),
  addNew: ctrlWrapper(addNew),
};
