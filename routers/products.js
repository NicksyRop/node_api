const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

const Product = require("../models/Product");

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).send("Invalid category");
  } else {
    var product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.countInStock,
      numRevies: req.body.numRevies,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res.status(500).json("Product cannot be create");
    } else {
      return res.status(201).json(product);
    }
  }
});

router.get(`/`, async (req, res) => {
  const products = await Product.find().populate("category");

  if (!products) {
    return res.status(500).json({
      success: false,
    });
  } else {
    return res.status(200).json(products);
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    return res.status(404).json("Product not found");
  } else {
    return res.status(200).json(product);
  }
});

module.exports = router;
