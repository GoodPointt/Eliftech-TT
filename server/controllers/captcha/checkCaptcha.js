const bcrypt = require('bcrypt');

const checkCaptcha = (req, res, next) => {
  bcrypt.compare(req.body.captcha, req.body.hash, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error in captcha verification' });
    } else if (result) {
      res.status(200).json({ message: 'Verification successful' });
    } else {
      res.status(200).json({ message: 'Invalid captcha' });
    }
  });
};

module.exports = checkCaptcha;
