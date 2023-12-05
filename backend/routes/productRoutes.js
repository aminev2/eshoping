import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/:id", getProductById);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
