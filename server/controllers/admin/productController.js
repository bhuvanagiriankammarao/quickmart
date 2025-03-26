import Product from '../../models/admin/product.js';
import cloudinary from '../../config/cloudinary.js';
import Category from '../../models/admin/categoryModels.js'; // Category model
import subCategory from '../../models/admin/subCategoryModels.js'; 
import mongoose from 'mongoose';

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category, 
      price,
      stock,
      productDetails,
      originalprice,
      productId,
      quantity,
      subCategory,      
    } = req.body;

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).json({ message: 'Category not found', requestedCategory: category });
    }

    let image = '';
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
      image = uploadResult.secure_url; 
    }

    const product = new Product({
      name,
      productId,
      category: categoryDoc._id,
      subCategory: subCategory ? new mongoose.Types.ObjectId(subCategory) : null,
      price,
      stock,
      image,
      productDetails,
      originalprice,
      quantity,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
  
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name')
    .populate('subCategory', 'name');
    res.status(200).json(products); 
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Delete image from Cloudinary if it exists
    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0]; 
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};

// Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, category, price, stock, productDetails, originalprice, productId, quantity } = req.body;
//     let updatedImage = undefined;
//     if (req.file) {
//       const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
//       updatedImage = uploadResult.secure_url;
//     }

//     // Update the product
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         productId,
//         category,
//         price,
//         stock,
//         productDetails,
//         originalprice,
//         quantity,
//         ...(updatedImage && { image: updatedImage }),  
//       },
//       { new: true } 
//     );
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product updated successfully', updatedProduct });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Failed to update product', error });
//   }
// };

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, subCategory, price, stock, productDetails, originalprice, productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (subCategory && !mongoose.Types.ObjectId.isValid(subCategory)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    let updatedImage = undefined;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
      updatedImage = uploadResult.secure_url;
    }

    // Update the product, including subCategory
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        productId,
        category,
        subCategory,  // ✅ Now updates subCategory
        price,
        stock,
        productDetails,
        originalprice,
        quantity,
        ...(updatedImage && { image: updatedImage }),  
      },
      { new: true }
    ).populate("category subCategory");  // ✅ Populate category and subCategory

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error });
  }
};


// Get Products by Category
export const getProductsByCategory = async (req, res) => {
  const { categoryname } = req.params;
  if (!categoryname) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Category name is required in the URL parameter.',
    });
  }
  try {
    // Find the category by its name
    const categoryDoc = await Category.findOne({ name: categoryname });
    if (!categoryDoc) {
      return res.status(404).json({
        error: 'Category not found',
        message: `No category found with name: ${categoryname}`,
      });
    }
    const products = await Product.find({ category: categoryDoc._id }).populate('category', categoryname);
    if (!products.length) {
      return res.status(200).json({
        message: `No products found in category: ${categoryname}`,
      });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
};

export const getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    // console.log("Received subcategoryId:", subcategoryId); 
    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
      return res.status(400).json({ message: 'Invalid subcategory ID' });
    }
    const products = await Product.find({ subCategory: subcategoryId })
      .populate('category', 'name')
      .populate('subCategory', 'name');
      //  console.log("Fetched products:", products);
    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by subcategory:', error.message);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Fetch Random Products
export const getRandomProducts = async (req, res) => {
  try {
    const productCount = 8; 
    // Fetch random products using MongoDB's $sample aggregation
    const randomProducts = await Product.aggregate([
      { $sample: { size: productCount } } 
    ]);
    // If no products are found
    if (!randomProducts.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json({ products: randomProducts });
  } catch (error) {
    console.error('Error fetching random products:', error.message);
    res.status(500).json({ message: 'Failed to fetch random products', error: error.message });
  }
};


export const getLowStockProducts = async (req, res) => {
  try {
    const threshold = req.query.threshold || 5; // Default threshold for low stock
    const lowStockProducts = await Product.find({ stock: { $lt: threshold } })
      .populate('category', 'name')
      .populate('subCategory', 'name');

    if (!lowStockProducts.length) {
      return res.status(200).json({ message: 'No low stock products found' });
    }

    res.status(200).json({ lowStockProducts });
  } catch (error) {
    console.error('Error fetching low stock products:', error.message);
    res.status(500).json({ message: 'Failed to fetch low stock products', error: error.message });
  }
};


const productController = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  getProductsBySubcategory,
  getRandomProducts,
  getLowStockProducts,
};

export default productController;