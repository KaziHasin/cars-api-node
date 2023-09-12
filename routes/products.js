const express = require("express");
const { allProduct, createProduct } = require("../controllers/product");
const router = express.Router();

router.get("/", allProduct).post("/", createProduct);

module.exports = router;
