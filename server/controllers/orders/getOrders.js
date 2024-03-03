const { Order } = require('../../models/order');

const getOrders = async (req, res) => {
  const { email, phone } = req.query;

  const mainQuery = {
    $or: [{ email }, { phone }],
  };

  try {
    const result = await Order.find(mainQuery).populate({
      path: 'medicines.medicine',
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getOrders;
