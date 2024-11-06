
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home'; 
import Shop from '../pages/Shop/Shop'; 
import About from '../pages/About/About'; 
import Contact from '../pages/Contact/Contact'; 
import SignIn from '../pages/SignIn/SignIn'; 
import SignUp from '../pages/SignUp/SignUp'; 
import SearchResults from '../pages/SearchResults/SearchResults'; 
import Cart from '../pages/Cart/Cart'; 
import Wishlist from '../pages/Wishlist/Wishlist'; 
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import Payment from '../pages/Payment/Payment';
import OrderPlaced from '../pages/OrderPlaced/OrderPlaced';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route  path='/payment' element={<Payment />}/>
      <Route  path='/orderplaced' element={<OrderPlaced/>}/>
   
      
     

      {/* Categories and Products */}
      <Route path="/category" element={<CategoryList />} />
      <Route path="/category/:categoryId" element={<ProductList />} />

      {/* Product Details Route */}
      <Route path="/product/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;


