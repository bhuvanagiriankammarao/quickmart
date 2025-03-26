import express from "express";
import { getAverageRevenue } from "../../controllers/admin/revenueController.js";

const router = express.Router();

// Route to fetch average revenue
router.get("/average-revenue", getAverageRevenue);

export default router;
