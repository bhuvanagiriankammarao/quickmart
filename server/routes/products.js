
// routes/products.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController'); 

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), productController.addProduct); 

router.get('/get',  productController.getProducts);

router.delete('/delete/:id', productController.deleteProduct );

router.put('/update/:id', upload.single('image'), productController.updateProduct);



module.exports = router;
