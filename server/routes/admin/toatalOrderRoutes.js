import express from "express";
import { getTotalOrders } from "../../controllers/admin/totalOrdersController.js"; // Ensure correct path

const router = express.Router();

// Route to get total number of orders
router.get("/total-orders", getTotalOrders);



export default router;
