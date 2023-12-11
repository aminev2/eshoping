import { Router } from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  addCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.route("/").post(protect, admin, addCategory).get(getAllCategories);
router
  .route("/:id")
  .post(protect, admin, addCategory)
  .delete(protect, admin, deleteCategory);

export default router;
