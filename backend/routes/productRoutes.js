import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProductReview,
} from "../controllers/productController.js";

import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
