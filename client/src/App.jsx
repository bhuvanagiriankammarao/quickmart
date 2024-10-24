import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components//Navbar'; // Adjusted import path
import AppRoutes from './pages/Routes';
import { CartProvider } from './context/CartContext';  // Ensure CartContext exists and is correctly imported

const App = () => {
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <AppRoutes />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
