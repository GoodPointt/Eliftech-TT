const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Store name is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

storeSchema.post('save', handleMongooseError);

const Store = model('store', storeSchema);

const storeJoiSchema = Joi.object({
  name: Joi.string().required(),
});

const schemas = {
  storeJoiSchema,
};

module.exports = { Store, schemas };
