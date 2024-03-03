const { Medicine } = require('../../models/medicine');

const listAll = async (req, res) => {
  const { page, limit, byStore, query, sortBy, sortDir } = req.query;

  const regex = new RegExp(query, 'i');
  const storeQuery = byStore ? { store: byStore } : {};

  const mainQuery = {
    ...storeQuery,
    $or: [{ name: { $regex: regex } }],
  };

  const count = await Medicine.find(mainQuery).count();

  let sortCriteria = {};
  if (sortBy) {
    sortCriteria[sortBy] = sortDir === 'desc' ? -1 : 1;
  } else {
    sortCriteria.createdAt = -1;
  }

  const result = await Medicine.find(mainQuery)
    .limit(parseInt(limit))
    .skip(parseInt(limit) * (parseInt(page) - 1))
    .sort(sortCriteria);

  res.json({ data: result, count });
};

module.exports = listAll;
