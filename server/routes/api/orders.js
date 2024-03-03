const express = require('express');

const ctrl = require('../../controllers/orders');
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/order');

router.post(
  '/',
  authenticate,
  validateBody(schemas.createOrderJoiSchema),
  ctrl.createOrder
);

module.exports = router;
