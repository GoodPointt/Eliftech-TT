const { Store } = require('../../models/store');

const listAll = async (req, res) => {
  const result = await Store.find();
  res.json(result);
};

module.exports = listAll;
