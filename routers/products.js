const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((createdProduct) => {
      return res.status(201).json(createdProduct);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.get(`/`, async (req, res) => {
  const products = await Product.find();

  if (!products) {
    return res.status(500).json({
      success: false,
    });
  } else {
    return res.status(200).json(products);
  }
});

module.exports = router;
