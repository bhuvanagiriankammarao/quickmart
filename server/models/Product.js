// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   stock: { type: Number, required: true },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
// });

// module.exports = mongoose.model('Product', productSchema);


/////////.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  originalprice: { type: Number, required: true },
 quantity: { type: String, required: true },
  productId: { type: String, required: true },
  productDetails: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
