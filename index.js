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
var { expressjwt: jwt } = require("express-jwt");

//middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

//isRevokedCallback

const isRevokedCallback = async (req, payload) => {
  const isAdmin = payload.payload.isAdmin;

  console.log(isAdmin);

  if (isAdmin) {
    return false;
  } else {
    return true;
  }
};

//expressJwt to protect routes
app.use(
  jwt({
    secret: process.env.secret,
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback,
  }).unless({
    path: [
      "/api/v1/users/login",
      "/api/v1/users/register",
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  })
);

//error handling
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "invalid token..." });
  } else {
    next(err);
  }
});

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
