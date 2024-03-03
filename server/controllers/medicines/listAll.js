const { Medicine } = require('../../models/medicine');

const listAll = async (req, res) => {
  const { page, limit, byStore, query } = req.query;

  const regex = new RegExp(query, 'i');
  const storeQuery = byStore ? { store: byStore } : {};

  const mainQuery = {
    ...storeQuery,
    $or: [{ name: { $regex: regex } }],
  };

  const count = await Medicine.find(mainQuery).count();

  const result = await Medicine.find(mainQuery)
    .limit(parseInt(limit))
    .skip(parseInt(limit) * (parseInt(page) - 1));

  res.json({ data: result, count });
};

module.exports = listAll;
