// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';  // Import CartProvider
import AppRoutes from './pages/Routes';  // Import the new routing component

const App = () => {
  return (
    <Router>
      <CartProvider>  {/* Wrap the app with CartProvider */}
        <div>
          <Navbar />
          <AppRoutes />  {/* Call the AppRoutes component */}
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
