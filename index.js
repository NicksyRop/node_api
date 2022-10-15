const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv").config();
const api = process.env.API_URL;
const mongo = process.env.MONGO_url;

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.get(api, (req, res) => {
  res.send("Hello Api");
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

app.get(`${api}/products`, async (req, res) => {
  const products = await Product.find();

  return res.send(products);
});

main()
  .then((res) => console.log("Database connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo);
}

app.listen(3000, () => {
  console.log(`serevr running on http://localhost:3000`);
});
