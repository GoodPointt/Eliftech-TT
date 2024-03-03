const express = require('express');

const ctrl = require('../../controllers/stores');
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/store');

router.get('/', ctrl.listAll);

router.post(
  '/',
  authenticate,
  validateBody(schemas.storeJoiSchema),
  ctrl.addNew
);

module.exports = router;
