const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const orderedMedicinesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'medicines',
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

const medicineSchema = Joi.object({
  _id: Joi.string().required().messages({
    'string.base': `"medicine" should be a type of 'text'`,
    'string.empty': `"medicine" cannot be an empty field`,
    'any.required': `"medicine" is a required field`,
  }),
  count: Joi.number().required().messages({
    'number.base': `"count" should be a type of 'number'`,
    'number.empty': `"count" cannot be an empty field`,
    'any.required': `"count" is a required field`,
  }),
});

const orderSchema = new Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    email: {
      type: String,
      match: [emailRegexp],
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    medicines: [orderedMedicinesSchema],
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.post('save', handleMongooseError);

const Order = model('orders', orderSchema);

const createOrderJoiSchema = Joi.object({
  address: Joi.string().required().messages({
    'string.base': `"address" should be a type of 'text'`,
    'string.empty': `"address" cannot be an empty field`,
    'any.required': `"address" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.pattern.base': `"email" is not valid`,
    'any.required': `"email" is a required field`,
  }),
  phone: Joi.string().min(6).messages({
    'string.base': `"phone" should be a type of 'text'`,
    'string.empty': `"phone" cannot be an empty field`,
    'any.required': `"phone" is a required field`,
  }),
  username: Joi.string().required().messages({
    'string.base': `"username" should be a type of 'text'`,
    'string.empty': `"username" cannot be an empty field`,
    'any.required': `"username" is a required field`,
  }),
  medicines: Joi.array().items(medicineSchema).required().messages({
    'array.base': `"medicines" should be a type of 'array'`,
    'array.empty': `"medicines" cannot be an empty`,
    'any.required': `"medicines" is a required`,
  }),
  totalPrice: Joi.number().required().messages({
    'number.base': `"totalPrice" should be a type of 'number'`,
    'number.empty': `"totalPrice" cannot be an empty field`,
    'any.required': `"totalPrice" is a required field`,
  }),
});

const schemas = {
  createOrderJoiSchema,
};

module.exports = { Order, schemas };
