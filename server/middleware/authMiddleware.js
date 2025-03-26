// // middleware/authMiddleware.js
// const admin = require('../config/firebaseConfig');

// // Middleware to verify Firebase token
// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   try {
//     // Verify Firebase token
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken; // Attach decoded token to request object
//     next(); // Move to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized', error });
//   }
// };

// module.exports = verifyToken;









import admin from '../config/firebaseConfig.js';

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded token to request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error });
  }
};

export default verifyToken;
