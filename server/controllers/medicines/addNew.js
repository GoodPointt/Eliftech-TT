const { Medicine } = require('../../models/medicine');

const addNew = async (req, res) => {
  const result = await Medicine.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = addNew;
