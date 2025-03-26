// controllers/productController.js
const Product = require('../models/Product');

///////////Ankam Rao/////////////Start////////////

/////////Adding product////////////////
const addProduct = async (req, res) => {
  try {
    console.log(req.body)
    const { name, category, price, stock, productDetails, originalprice, productId, quantity, } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ''; // Path to image

    const product = new Product({
      name,
      productId,
      category,
      price,
      stock,
      image, // Store image path in DB
      productDetails,
      originalprice,
      quantity,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

//////////Getting product//////////////
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

/////////////////// delete product//////////////

const deleteProduct = async (req, res) => {
  console.log(req.params)
  try {
    const productId = req.params.id;
    console.log(productId)
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from URL parameters
    const { name, category, price, stock, productDetails, originalprice, productId, quantity } = req.body;

    // Use the new image file if it's provided
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Find the product by ID and update fields
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        productId,
        category,
        price,
        stock,
        productDetails,
        originalprice,
        quantity,
        ...(image && { image }), // Only update the image field if a new image is provided
      },
      { new: true } // Return the updated product after modification
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error });
  }
};






///////////Ankam Rao/////////////END////////////

module.exports = { addProduct, getProducts, deleteProduct, updateProduct };




