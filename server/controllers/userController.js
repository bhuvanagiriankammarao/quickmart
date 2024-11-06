// // controllers/userController.js
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Adjust the path as necessary

// const registerUser = async (req, res) => {
//   const { email, password, phoneNumber } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       password: hashedPassword, // Store the hashed password
//       phoneNumber,
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error saving user to MongoDB:', error);
//     res.status(400).json({ message: 'User validation failed', error: error.message });
//   }
// };

// module.exports = { registerUser };





const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure you import the User model

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error);
    res.status(400).json({ message: 'User validation failed', error: error.message });
  }
};

module.exports = { registerUser };