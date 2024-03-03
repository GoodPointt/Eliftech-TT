const express = require('express');

const ctrl = require('../../controllers/medicines');
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/medicine');

router.get('/', ctrl.listAll);

router.post(
  '/',
  authenticate,
  validateBody(schemas.medicineJoiSchema),
  ctrl.addNew
);

module.exports = router;
