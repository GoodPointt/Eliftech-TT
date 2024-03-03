const { Store } = require('../../models/store');

const addNew = async (req, res) => {
  const result = await Store.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = addNew;
