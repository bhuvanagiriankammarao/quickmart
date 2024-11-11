import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './Routing/Routes';
import { CartProvider } from './context/CartContext'; 
import Footer from './components/Footer';
import FeaturesSection from './section/FeaturesSection';
import { Provider } from 'react-redux';
import store from './store/store';
import AdminRoutes from './Routing/AdminRoutes';
import ChatSupport from './pages/Chat/Chat';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route 
              path="/*" 
              element={
                <>
                  <Navbar />
                  <AppRoutes />
                  <FeaturesSection />
                  <Footer />
                  <ChatSupport />
                </>
              } 
            />
          </Routes>
        </CartProvider>
      </Router>
    </Provider>
  );
};

export default App;