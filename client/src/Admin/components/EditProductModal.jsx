// import React from "react";

// const EditProductModal = ({
//   showModal,
//   onClose,
//   product,
//   imagePreview,
//   onInputChange,
//   onImageChange,
//   onUpdate,
//   loading,
//   categories,
//   subcategories,
//   handleInputChange,
//   handleCategoryChange,
// }) => {
//   if (!showModal) return null;

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg max-h-[90vh] overflow-y-auto">
//       <h2 className="text-2xl font-bold">Edit Product</h2>
//       <form onSubmit={onUpdate}>
//         <div className="grid grid-cols-2 gap-4">
//           <label className="text-gray-600 font-semibold">
//             Product ID
//             <input
//               type="text"
//               name="productId"
//               value={product.productId}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               readOnly
//             />
//           </label>
//           <label className="text-gray-600 font-semibold">
//             Product Name
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>

//           <select
//             name="category"
//             value={product.category}
//             onChange={handleCategoryChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select a Category</option>
//             {categories &&
//               categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//           </select>

//           <select
//             name="subcategory"
//             value={product.subcategory || ""}
//             onChange={handleInputChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select a Subcategory</option>
//             {subcategories && subcategories.length > 0 ? (
//               subcategories.map((subcategory) => (
//                 <option key={subcategory._id} value={subcategory._id}>
//                   {subcategory.name}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 No subcategories available
//               </option>
//             )}
//           </select>

//           <label className="text-gray-600 font-semibold">
//             Price
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           <label className="text-gray-600 font-semibold">
//             Original Price
//             <input
//               type="number"
//               name="originalprice"
//               value={product.originalprice}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           <label className="text-gray-600 font-semibold">
//             Stock
//             <input
//               type="number"
//               name="stock"
//               value={product.stock}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           <label className="text-gray-600 font-semibold">
//             Quantity
//             <input
//               type="text"
//               name="quantity"
//               value={product.quantity}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           <label className="text-gray-600 font-semibold col-span-2">
//             Product Details
//             <textarea
//               name="productDetails"
//               value={product.productDetails}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             ></textarea>
//           </label>
//           <label className="text-gray-600 font-semibold">
//             Image
//             <input
//               type="file"
//               name="image"
//               onChange={onImageChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-32 h-32 mt-2 object-cover"
//               />
//             )}
//           </label>
//         </div>
//         <div className="flex justify-between mt-6">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Product"}
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProductModal;



// components/EditProductModal.js
import React from "react";

const EditProductModal = ({
  showModal,
  onClose,
  product,
  imagePreview,
  onInputChange,
  onImageChange,
  onUpdate,
  loading,
  categories,
  subcategories,
  handleCategoryChange,
}) => {
  if (!showModal) return null;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={onUpdate}>
        <div className="grid grid-cols-2 gap-4">
          {/* Product ID */}
          <label className="text-gray-600 font-semibold">
            Product ID
            <input
              type="text"
              name="productId"
              value={product.productId}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              readOnly
            />
          </label>

          {/* Product Name */}
          <label className="text-gray-600 font-semibold">
            Product Name
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              required
            />
          </label>

          {/* Category */}
          <label className="text-gray-600 font-semibold">
            Category
            <select
              name="category"
              value={
                typeof product.category === "object" && product.category !== null
                  ? product.category._id
                  : product.category || ""
              }
              onChange={handleCategoryChange}
              className="w-full border p-2 rounded text-black"
              required
            >
              <option value="">Select a Category</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </label>

          {/* Subcategory */}
          <label className="text-gray-600 font-semibold">
            Subcategory
            <select
              name="subCategory"
              value={
                typeof product.subCategory === "object" && product.subCategory !== null
                  ? product.subCategory._id
                  : product.subCategory || ""
              }
              onChange={onInputChange}
              className="w-full border p-2 rounded text-black"
              required
            >
              <option value="">Select a Subcategory</option>
              {subcategories && subcategories.length > 0 ? (
                subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No subcategories available
                </option>
              )}
            </select>
          </label>

          {/* Price */}
          <label className="text-gray-600 font-semibold">
            Price
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              required
            />
          </label>

          {/* Original Price */}
          <label className="text-gray-600 font-semibold">
            Original Price
            <input
              type="number"
              name="originalprice"
              value={product.originalprice}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              required
            />
          </label>

          {/* Stock */}
          <label className="text-gray-600 font-semibold">
            Stock
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              required
            />
          </label>

          {/* Quantity */}
          <label className="text-gray-600 font-semibold">
            Quantity
            <input
              type="text"
              name="quantity"
              value={product.quantity}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              required
            />
          </label>

          {/* Product Details */}
          <label className="text-gray-600 font-semibold col-span-2">
            Product Details
            <textarea
              name="productDetails"
              value={product.productDetails}
              onChange={onInputChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
              required
            ></textarea>
          </label>

          {/* Image */}
          <label className="text-gray-600 font-semibold">
            Image
            <input
              type="file"
              name="image"
              onChange={onImageChange}
              className="p-2 border rounded-md w-full mt-1 text-black"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 mt-2 object-cover"
              />
            )}
          </label>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;


// import React, { useEffect } from "react";

// const EditProductModal = ({
//   showModal,
//   onClose,
//   product,
//   imagePreview,
//   onInputChange,
//   onImageChange,
//   onUpdate,
//   loading,
//   categories,
//   subcategories,
//   handleCategoryChange,
// }) => {
//   if (!showModal) return null;

//   // (Optional) If you want to auto-fetch subcategories when the modal opens,
//   // you could add an effect here as well. In our example, the parent component
//   // already triggers the fetch when productToEdit changes.

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg max-h-[90vh] overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
//       <form onSubmit={onUpdate}>
//         <div className="grid grid-cols-2 gap-4">
//           {/* Product ID */}
//           <label className="text-gray-600 font-semibold">
//             Product ID
//             <input
//               type="text"
//               name="productId"
//               value={product.productId}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               readOnly
//             />
//           </label>
//           {/* Product Name */}
//           <label className="text-gray-600 font-semibold">
//             Product Name
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           {/* Category */}
//           <label className="text-gray-600 font-semibold">
//             Category
//             <select
//               name="category"
//               value={
//                 typeof product.category === "object" && product.category !== null
//                   ? product.category._id
//                   : product.category || ""
//               }
//               onChange={handleCategoryChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//           {/* Subcategory */}
//           <label className="text-gray-600 font-semibold">
//             Subcategory
//             <select
//               name="subCategory"
//               value={
//                 typeof product.subCategory === "object" && product.subCategory !== null
//                   ? product.subCategory._id
//                   : product.subCategory || ""
//               }
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             >
//               <option value="">Select Subcategory</option>
//               {subcategories.map((sub) => (
//                 <option key={sub._id} value={sub._id}>
//                   {sub.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//           {/* Price */}
//           <label className="text-gray-600 font-semibold">
//             Price
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           {/* Original Price */}
//           <label className="text-gray-600 font-semibold">
//             Original Price
//             <input
//               type="number"
//               name="originalprice"
//               value={product.originalprice}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           {/* Stock */}
//           <label className="text-gray-600 font-semibold">
//             Stock
//             <input
//               type="number"
//               name="stock"
//               value={product.stock}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           {/* Quantity */}
//           <label className="text-gray-600 font-semibold">
//             Quantity
//             <input
//               type="text"
//               name="quantity"
//               value={product.quantity}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             />
//           </label>
//           {/* Product Details */}
//           <label className="text-gray-600 font-semibold col-span-2">
//             Product Details
//             <textarea
//               name="productDetails"
//               value={product.productDetails}
//               onChange={onInputChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//               required
//             ></textarea>
//           </label>
//           {/* Image */}
//           <label className="text-gray-600 font-semibold col-span-2">
//             Image
//             <input
//               type="file"
//               name="image"
//               onChange={onImageChange}
//               className="p-2 border rounded-md w-full mt-1 text-black"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-32 h-32 mt-2 object-cover"
//               />
//             )}
//           </label>
//         </div>
//         <div className="flex justify-between mt-6">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Product"}
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProductModal;
