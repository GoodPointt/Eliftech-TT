const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ctrl = require('../../controllers/captcha');

router.get('/:width?/:height?/', ctrl.getCaptcha);

router.post('/', ctrl.checkCaptcha);

module.exports = router;
