const express = require("express");
const auth = require("../controllers/auth");
const product = require("../controllers/product");
const cart = require("../controllers/cart");
const isAuthenticated = require("../middlewares/isAuthenticated");

const routes = express.Router();

routes.route("/health-check").get(async (req, res) => {
  res.status(200).json({ message: "Camera-Store HEALTH: OK!" });
});

routes.use("/auth", auth);
routes.use("/product", isAuthenticated, product);
routes.use("/cart", isAuthenticated, cart);

module.exports = routes;
