//es module
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.js'; // Import the Cloudinary config
import productController from '../../controllers/admin/productController.js';

const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', 
    allowed_formats: ['jpeg', 'png', 'jpg'], 
  },
});

const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), productController.addProduct);

router.get('/get', productController.getProducts);

router.delete('/delete/:id', productController.deleteProduct);

router.put('/update/:id', upload.single('image'), productController.updateProduct);

router.get("/category/:categoryname", productController.getProductsByCategory);

router.get('/subcategory/:subcategoryId', productController.getProductsBySubcategory);


router.get('/products/random', productController.getRandomProducts);

router.get('/low-stock', productController.getLowStockProducts);

export default router;
