import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },


subCategory: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'subCategory', 
  default: null, 
},
  stock: { type: Number, required: true },
  originalprice: { type: Number, required: true },
  quantity: { type: String, required: true },
  productId: { type: String, required: true },
  productDetails: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model('Product', productSchema);
