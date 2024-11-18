// const express = require('express');
// const router = express.Router();
// const Category = require('../models/Category');

// // Get all categories
// router.get('/', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new category
// router.post('/', async (req, res) => {
//   const { name, sold, stock } = req.body;
//   const category = new Category({ name, sold, stock });
//   try {
//     const newCategory = await category.save();
//     res.status(201).json(newCategory);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update a category
// router.patch('/:id', async (req, res) => {
//   try {
//     const updatedCategory = await Category.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedCategory);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a category
// router.delete('/:id', async (req, res) => {
//   try {
//     await Category.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Category deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
