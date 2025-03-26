// import subCategory from '../../models/admin/subCategoryModels.js'; 
// import cloudinary from '../../config/cloudinary.js'; 
// import mongoose from "mongoose";


// export const addSubCategory = async (req, res) => {
//     try {
//       const { name, category } = req.body; // Expect `category` as a single ObjectId string
//       let imageUrl = "";
//       if (!mongoose.Types.ObjectId.isValid(category)) {
//         return res.status(400).json({ message: "Invalid parent category ID" });
//       }
  
//       // Upload image to Cloudinary if provided
//       if (req.file) {
//         const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
//         imageUrl = uploadResult.secure_url;
//       }
  
//       const subcategory = new subCategory({
//         name,
//         category: [new mongoose.Types.ObjectId(category)], // Convert to ObjectId
//         image: imageUrl,
//       });
  
//       await subcategory.save();
//       res.status(201).json({ message: "Subcategory added successfully", subcategory });
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       res.status(500).json({ message: "Failed to add subcategory", error: error.message });
//     }
//   };

// // Backend Controller to fetch Subcategories
// export const getSubCategories = async (req, res) => {
//     try {
//       const subcategories = await subCategory.find().populate('category', 'name'); // Fetch subcategories
//       res.status(200).json(subcategories);
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       res.status(500).json({ message: 'Failed to fetch subcategories', error });
//     }
//   };

// export const deleteSubCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if the ID is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid subcategory ID' });
//     }

//     const subcategory = await subCategory.findById(id);
//     if (!subcategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }

//     // Delete image from Cloudinary if it exists
//     if (subcategory.image) {
//       const publicIdMatch = subcategory.image.match(/\/([^/]+)\.[^/.]+$/);
//       const publicId = publicIdMatch ? publicIdMatch[1] : null;

//       if (publicId) {
//         await cloudinary.uploader.destroy(`categories/${publicId}`); // Adjust folder name if necessary
//       } else {
//         console.warn('Could not extract public_id from image URL:', subcategory.image);
//       }
//     }

//     // Delete the subcategory
//     await subCategory.findByIdAndDelete(id);

//     res.status(200).json({ message: 'Subcategory deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting subcategory:', error);
//     res.status(500).json({ message: 'Failed to delete subcategory', error });
//   }
// };

// //update category
// export const updateSubCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description,category } = req.body;

//     let updatedImage = undefined;

//     // Upload new image to Cloudinary if provided
//     if (req.file) {
//       const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'categories' });
//       updatedImage = uploadResult.secure_url;
//     }

//     const updatedSubCategory = await subCategory.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         category,
//         ...(updatedImage && { image: updatedImage }), 
//       },
//       { new: true } 
//     );

//     if (!updatedSubCategory) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.status(200).json({ message: 'Category updated successfully', updatedSubCategory });
//   } catch (error) {
//     console.error('Error updating category:', error);
//     res.status(500).json({ message: 'Failed to update category', error });
//   }
// };

// export const getSubcategoriesByCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.query;

//     if (!categoryId) {
//       return res.status(400).json({ message: "Category ID is required" });
//     }

//     // Find subcategories matching the categoryId
//     const subcategories = await subCategory.find({ category: categoryId });

//     if (!subcategories.length) {
//       return res.status(404).json({ message: "No subcategories found" });
//     }

//     res.status(200).json({ subcategories });
//   } catch (error) {
//     console.error("Error fetching subcategories:", error);
//     res.status(500).json({ message: "Failed to fetch subcategories", error });
//   }
// };


// const subCategoryController = {
//     addSubCategory,
//     getSubCategories,
//     deleteSubCategory,
//     updateSubCategory,
//     getSubcategoriesByCategory
    
// };

// export default subCategoryController;




// import subCategory from '../../models/admin/subCategoryModels.js'; 
// import cloudinary from '../../config/cloudinary.js'; 
// import mongoose from "mongoose";

// // ✅ Add SubCategory
// export const addSubCategory = async (req, res) => {
//     try {
//         const { name, category } = req.body;
//         let imageUrl = "";

//         if (!mongoose.Types.ObjectId.isValid(category)) {
//             return res.status(400).json({ message: "Invalid parent category ID" });
//         }

//         // Upload image if provided
//         if (req.file) {
//             const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
//             imageUrl = uploadResult.secure_url;
//         }

//         const subcategory = new subCategory({
//             name,
//             category: new mongoose.Types.ObjectId(category),
//             image: imageUrl,
//         });

//         await subcategory.save();
//         res.status(201).json({ message: "Subcategory added successfully", subcategory });
//     } catch (error) {
//         console.error("Error adding subcategory:", error);
//         res.status(500).json({ message: "Failed to add subcategory", error: error.message });
//     }
// };

// // ✅ Fetch All SubCategories
// export const getSubCategories = async (req, res) => {
//     try {
//         const subcategories = await subCategory.find().populate('category', 'name'); 
//         res.status(200).json(subcategories);
//     } catch (error) {
//         console.error('Error fetching subcategories:', error);
//         res.status(500).json({ message: 'Failed to fetch subcategories', error });
//     }
// };

// // ✅ Delete SubCategory
// export const deleteSubCategory = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid subcategory ID' });
//         }

//         const subcategory = await subCategory.findById(id);
//         if (!subcategory) {
//             return res.status(404).json({ message: 'Subcategory not found' });
//         }

//         // Delete image from Cloudinary
//         if (subcategory.image) {
//             const publicIdMatch = subcategory.image.match(/\/([^/]+)\.[^/.]+$/);
//             const publicId = publicIdMatch ? publicIdMatch[1] : null;
//             if (publicId) {
//                 await cloudinary.uploader.destroy(`categories/${publicId}`);
//             }
//         }

//         await subCategory.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Subcategory deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting subcategory:', error);
//         res.status(500).json({ message: 'Failed to delete subcategory', error });
//     }
// };

// // ✅ Update SubCategory (Fixed)
// export const updateSubCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, category, subCategory } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid subcategory ID' });
//         }

//         let updatedImage = undefined;

//         // Upload new image if provided
//         if (req.file) {
//             const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'categories' });
//             updatedImage = uploadResult.secure_url;
//         }

//         const updateData = {
//             name,
//             description,
//             category: mongoose.Types.ObjectId.isValid(category) ? new mongoose.Types.ObjectId(category) : category,
//             subCategory: mongoose.Types.ObjectId.isValid(subCategory) ? new mongoose.Types.ObjectId(subCategory) : subCategory,
//         };

//         if (updatedImage) {
//             updateData.image = updatedImage;
//         }

//         // const updatedSubCategory = await subCategory.findByIdAndUpdate(id, updateData, { new: true });
//         const updatedSubCategory = await subCategory.findByIdAndUpdate(id, updateData, { new: true });

//         if (!updatedSubCategory) {
//             return res.status(404).json({ message: 'Subcategory not found' });
//         }

//         res.status(200).json({ message: 'Subcategory updated successfully', updatedSubCategory });
//     } catch (error) {
//         console.error('Error updating subcategory:', error);
//         res.status(500).json({ message: 'Failed to update subcategory', error });
//     }
// };

// // ✅ Get Subcategories by Category
// export const getSubcategoriesByCategory = async (req, res) => {
//     try {
//         const { categoryId } = req.query;

//         if (!categoryId) {
//             return res.status(400).json({ message: "Category ID is required" });
//         }

//         const subcategories = await subCategory.find({ category: categoryId });

//         if (!subcategories.length) {
//             return res.status(404).json({ message: "No subcategories found" });
//         }

//         res.status(200).json({ subcategories });
//     } catch (error) {
//         console.error("Error fetching subcategories:", error);
//         res.status(500).json({ message: "Failed to fetch subcategories", error });
//     }
// };

// const subCategoryController = {
//     addSubCategory,
//     getSubCategories,
//     deleteSubCategory,
//     updateSubCategory,
//     getSubcategoriesByCategory
// };

// export default subCategoryController;




import SubCategoryModel from '../../models/admin/subCategoryModels.js';  
import cloudinary from '../../config/cloudinary.js'; 
import mongoose from "mongoose";

// ✅ Add SubCategory
export const addSubCategory = async (req, res) => {
    try {
        const { name, category } = req.body;
        let imageUrl = "";

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: "Invalid parent category ID" });
        }

        // Upload image if provided
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
            imageUrl = uploadResult.secure_url;
        }

        const subcategory = new SubCategoryModel({
            name,
            category: new mongoose.Types.ObjectId(category),
            image: imageUrl,
        });

        await subcategory.save();
        res.status(201).json({ message: "Subcategory added successfully", subcategory });
    } catch (error) {
        console.error("Error adding subcategory:", error);
        res.status(500).json({ message: "Failed to add subcategory", error: error.message });
    }
};

// ✅ Fetch All SubCategories
export const getSubCategories = async (req, res) => {
    try {
        const subcategories = await SubCategoryModel.find().populate('category', 'name'); 
        res.status(200).json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ message: 'Failed to fetch subcategories', error });
    }
};

// ✅ Delete SubCategory
export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid subcategory ID' });
        }

        const subcategory = await SubCategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Delete image from Cloudinary
        if (subcategory.image) {
            const publicIdMatch = subcategory.image.match(/\/([^/]+)\.[^/.]+$/);
            const publicId = publicIdMatch ? publicIdMatch[1] : null;
            if (publicId) {
                await cloudinary.uploader.destroy(`categories/${publicId}`);
            }
        }

        await SubCategoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        res.status(500).json({ message: 'Failed to delete subcategory', error });
    }
};

// ✅ Update SubCategory (Fixed)
export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid subcategory ID' });
        }

        let updatedImage = undefined;

        // Upload new image if provided
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'categories' });
            updatedImage = uploadResult.secure_url;
        }

        const updateData = {
            name,
            description,
            category: mongoose.Types.ObjectId.isValid(category) ? new mongoose.Types.ObjectId(category) : category,
        };

        if (updatedImage) {
            updateData.image = updatedImage;
        }

        const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSubCategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json({ message: 'Subcategory updated successfully', updatedSubCategory });
    } catch (error) {
        console.error('Error updating subcategory:', error);
        res.status(500).json({ message: 'Failed to update subcategory', error });
    }
};

// ✅ Get Subcategories by Category
export const getSubcategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }

        const subcategories = await SubCategoryModel.find({ category: categoryId });

        if (!subcategories.length) {
            return res.status(404).json({ message: "No subcategories found" });
        }

        res.status(200).json({ subcategories });
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "Failed to fetch subcategories", error });
    }
};

const subCategoryController = {
    addSubCategory,
    getSubCategories,
    deleteSubCategory,
    updateSubCategory,
    getSubcategoriesByCategory
};

export default subCategoryController;
