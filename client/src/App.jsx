import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components//Navbar';
import AppRoutes from './pages/Routes';
import { CartProvider } from './context/CartContext'; 
import Footer from './components/Footer';
import FeaturesSection from './section/FeaturesSection';
import {Provider} from 'react-redux'
import store from './store/store';


const App = () => {
  return (
  <Provider store={store}>
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <AppRoutes />
        </div>
        <FeaturesSection />
        <Footer />
        
       
      </CartProvider>
     
    </Router>
    </Provider>
  );
};

export default App;
