import User from "../models/User.js";

//  Add a product to the user's wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { email, productId, name, imgURL, price, quantity, originalprice } = req.body;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is already in the wishlist
    const isAlreadyWishlisted = user.wishlist.some((item) => item.productId === productId);
    if (isAlreadyWishlisted) {
      return res.status(409).json({ error: "Product already in wishlist" });
    }

    // Add the product to the wishlist
    user.wishlist.push({ productId, name, imgURL, price, quantity, originalprice });
    await user.save();

    res.status(201).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  Get the wishlist for a specific user
export const getWishlist = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  Remove a product from the user's wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { email, productId } = req.body;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.wishlist = user.wishlist.filter((item) => item.productId !== productId);
    await user.save();

    res.status(200).json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
