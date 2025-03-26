import express from 'express';
import { fetchAllOrders } from '../controllers/adminController.js';

const router = express.Router();

// Route to fetch all orders
router.get('/orders', fetchAllOrders);

export default router;
