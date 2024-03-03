const healthCheck = async (req, res) => {
  const result = {
    status: 200,
    message: '✅Server healthy!',
  };
  res.json(result);
};

module.exports = healthCheck;
