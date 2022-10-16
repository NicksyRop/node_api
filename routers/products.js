const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

const Product = require("../models/Product");

const mongoose = require("mongoose");
router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid category");
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    { new: true }
  );

  if (!product) {
    return res.status(404).json("product cannot be updated");
  } else {
    return res.status(201).json(product);
  }
});

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
  let filter = {};
  if (req.query.categories) {
    filter = { categories: req.query.category.split(",") };
  }
  const products = await Product.find(filter).populate("category");

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

router.delete("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.body.id)) {
    return res.status(404).json("Invalid id");
  }

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json("Product not found");
  } else {
    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  }
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments({});
  if (!productCount) {
    return res.status(500).json({ success: false });
  } else {
    return res.status(200).json({
      count: productCount,
    });
  }
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.body.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(count);
  if (!products) {
    return res.status(500).json({ success: false });
  } else {
    return res.status(200).json(products);
  }
});

module.exports = router;
