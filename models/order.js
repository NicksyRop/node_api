const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrdderItem",
      required: true,
    },
  ],

  shippingAdress: {
    type: String,
    required: true,
  },
  shippingAdress1: {
    type: String,
    required: true,
  },
  shippingAdress2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  totalPrice: {
    type: Number,
  },
  shippingAdress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", itemSchema);
