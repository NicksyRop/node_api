const express = require("express");

const router = express.Router();

const Category = require("../models/Category");

router.get(`/`, async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    return res.status(500).json({
      success: false,
    });
  } else {
    return res.status(200).json(categories);
  }
});

router.post(`/`, async (req, res) => {
  var category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();
  if (!category) {
    return res.status(404).json("category cannot be created");
  } else {
    return res.status(201).json(category);
  }
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "category is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
