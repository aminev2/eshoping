// routes/visitRoutes.js
import { Router } from "express";
const router = Router();
import { getVisits } from "../controllers/visitController.js";

router.get('/', getVisits);

export default router;