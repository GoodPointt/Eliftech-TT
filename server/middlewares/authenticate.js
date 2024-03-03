const { HttpError } = require('../utils');
const { API_TOKEN } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token || API_TOKEN !== token)
    next(HttpError(401));

  next();
};

module.exports = authenticate;
