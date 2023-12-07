import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductCountByDay
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);

router.get("/count-by-day", getProductCountByDay);

router.get("/:id", getProductById);


export default router;
