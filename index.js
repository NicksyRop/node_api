const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();
const api = process.env.API_URL;
const mongo = process.env.MONGO_url;
var cors = require("cors");

const productRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");

//middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

//routers

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

main()
  .then((res) => console.log("Database connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo);
}

app.listen(3000, () => {
  console.log(`serevr running on http://localhost:3000`);
});
