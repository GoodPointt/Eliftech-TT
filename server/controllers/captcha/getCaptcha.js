const bcrypt = require('bcrypt');
const { generateCaptcha } = require('../../utils');

const getCaptcha = (req, res) => {
  const width = parseInt(req.params.width) || 200;
  const height = parseInt(req.params.height) || 100;
  const { image, text } = generateCaptcha(width, height);
  bcrypt.hash(text, 10, (err, hash) => {
    if (err) {
      res.send({ error: 'Error generating the captcha. Please try again.' });
    } else {
      res.send({ image, hash });
    }
  });
};

module.exports = getCaptcha;
