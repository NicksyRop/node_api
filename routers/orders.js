const express = require("express");

const router = express.Router();

const OrderItem = require("../models/order-item");

const Order = require("../models/Order");
const { get } = require("mongoose");
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orders) {
    res.status(500).json({ success: false });
  } else {
    res.status(200).json(orders);
  }
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!order) {
    res.status(500).json({ success: false });
  } else {
    res.status(200).json(order);
  }
});

router.post("/", async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();
      console.log(newOrderItem._id);

      return newOrderItem._id;
    })
  );

  const orderItemsResolvedIds = await orderItemsIds;
  console.log(orderItemsResolvedIds);

  let order = new Order({
    orderItems: orderItemsResolvedIds,
    shippingAdress1: req.body.shippingAdress1,
    shippingAdress2: req.body.shippingAdress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    user: req.body.user,
    totalPrice: req.body.totalPrice,
  });

  order = await order.save();

  if (!order) {
    res
      .status(400)
      .json({ success: false, message: "Message could not be created" });
  } else {
    res.status(200).json(order);
  }
});

module.exports = router;
