import express from "express";
import { getProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

// could use: router.route("/").get(getProducts);
router.get("/", getProducts);

// could use router.route("/:id").get(getProduct);
router.get("/:id", getProduct);

export default router;
