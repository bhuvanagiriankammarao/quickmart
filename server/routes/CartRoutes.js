import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/CartController.js";

const router = express.Router();

// Add product to cart
router.post("/add", addToCart);

// Remove product from cart
router.post("/remove", removeFromCart);

// Get cart for a specific user
router.get("/:email", getCart);


router.post("/clear", clearCart);
export default router;
