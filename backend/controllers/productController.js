import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// asyncHandler is an middleware used to handle exceptions (errors) replaces tryCatch

// @desc Fetch all products
// @route GET /api/products/
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  // get all products
  const products = await Product.find({});
  res.json(products);
});

// @desk Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
