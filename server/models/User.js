// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phoneNumber: { type: String, unique: true, sparse: true } // sparse allows for null values
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;