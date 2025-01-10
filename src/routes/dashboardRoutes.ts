import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();
console.log(getDashboardMetrics);

router.get("/", getDashboardMetrics);

export default router;