const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for medicine'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Set imageUrl for medicine'],
    },
    price: {
      type: Number,
      required: [true, 'Set price for medicine'],
    },
    rating: {
      type: Number,
      required: false,
    },
    numReviews: {
      type: Number,
      required: false,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'stores',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

medicineSchema.post('save', handleMongooseError);

const Medicine = model('medicine', medicineSchema);

const medicineJoiSchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number(),
  numReviews: Joi.number(),
  store: Joi.string().required(),
});

const schemas = {
  medicineJoiSchema,
};

module.exports = { Medicine, schemas };
