// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CategoryDropdown = () => {
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/admin/categories");
//         console.log("Categories fetched:", response.data);
//         setCategories(response.data); 
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryChange = async (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategory(categoryId);

//     if (!categoryId) {
//       setSubcategories([]);
//       return;
//     }

//     try {
//       const response = await axios.get(`/api/admin/subcategories?categoryId=${categoryId}`);
//       setSubcategories(response.data.subcategories);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setSubcategories([]);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="category-select">Select a Category:</label>
//       <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
//         <option value="">-- Select Category --</option>
//         {categories.map((category) => (
//           <option key={category._id} value={category._id}>
//             {category.name}
//           </option>
//         ))}
//       </select>

//       {subcategories.length > 0 && (
//         <div>
//           <label htmlFor="subcategory-select">Select a Subcategory:</label>
//           <select id="subcategory-select">
//             <option value="">-- Select Subcategory --</option>
//             {subcategories.map((subcategory) => (
//               <option key={subcategory._id} value={subcategory._id}>
//                 {subcategory.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryDropdown;
