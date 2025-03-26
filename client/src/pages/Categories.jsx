import React from 'react';
import CategoriesBanner from './components/CategoriesBanner';
import ProductDisplay from './components/ProductDisplay';

const categories = () => {
  return (
    <div className="App">
    <CategoriesBanner />
    <ProductDisplay />
  </div>
  )
}

export default categories
