import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductCountByDay,
  createProduct,
  deleteCategory,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/uploadImages.js";
const router = Router();

router.post("/", protect, admin, upload.array("image"), createProduct);

router.get("/", getProducts);

router.get("/count-by-day", getProductCountByDay);

router.get("/:id([0-9a-fA-F]{24})", getProductById);

router.delete("/:id([0-9a-fA-F]{24})", protect, admin, deleteCategory);

router.put("/:id([0-9a-fA-F]{24})", protect, admin, updateProduct);

export default router;
