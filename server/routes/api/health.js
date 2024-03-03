const express = require('express');

const ctrl = require('../../controllers/health');
const router = express.Router();

router.get('/', ctrl.healthCheck);

module.exports = router;
