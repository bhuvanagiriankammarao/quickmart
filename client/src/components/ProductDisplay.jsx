import React, { useState } from 'react';
import Pagination from './Pagination';

const ProductDisplay = () => {
  const allProducts = [
    {
      id: 1,
      name: "Aashirvaad Atta",
      imageUrl: "https://m.media-amazon.com/images/I/71PWhguzXkL._AC_UL320_.jpg",
      price: 500,
      discount: 30,
      description: "Aashirvaad Atta with Multigrains, 5kg pack, The High Fibre Atta",
    },
    {
      id: 2,
      name: "DAAWAT Super Basmati Rice",
      imageUrl: "https://m.media-amazon.com/images/I/710qWUaAmoL._AC_UL320_.jpg",
      price: 80,
      discount: 50,
      description: "Daawat Super Basmati Rice 1Kg + (100g/200g) | Fluffy Long Grains| Cooked upto 20mm*",
    },
    {
        id: 3,
        name: "Fortune Soya Health",
        imageUrl: "https://m.media-amazon.com/images/I/618B1c0fhWL.jpg",
        price: 500,
        discount: 30,
        description: "Fortune Soya Health Oil 5 Ltr",
      },
      {
        id: 4,
        name: "Tata Sampann",
        imageUrl: "https://m.media-amazon.com/images/I/61hKeyii6yL._SX679_.jpg",
        price: 500,
        discount: 30,
        description: "100% Natural Tata Sampann ",
      },
      {
        id: 5,
        name: "Jowar-Gains",
        imageUrl: "https://m.media-amazon.com/images/I/81AvZWAsR4L._AC_UL320_.jpg",
        price: 500,
        discount: 30,
        description: "3 S Jowar Gains",
      },
      {
        id: 6,
        name: "3 S Jowar",
        imageUrl: "https://m.media-amazon.com/images/I/81TmaASDhBL._AC_UL320_.jpg",
        price: 195,
        discount: 30,
        description: "3 S Jowar, 500g",
      },
      {
        id: 7,
        name: "3S Pulses - Chana Big",
        imageUrl: "https://m.media-amazon.com/images/I/815ohC0rDAL._AC_UL320_.jpg",
        price: 140,
        discount: 30,
        description: "3S Pulses - Chana Big, 500g",
      },
      {
        id: 8,
        name: "Oats Chocolate",
        imageUrl: "https://m.media-amazon.com/images/I/61ILThzV0bL._AC_UL640_QL65_.jpg",
        price: 500,
        discount: 40,
        description: "ALPINO High Protein Super Rolled Oats Chocolate 1kg - Rolled Oats, Natural Peanut Butter & Cocoa Powder – Protein, No Added Sugar & Salt, Gluten Free – As Seen on Shark Tank India",
      },
      {
        id: 9,
        name: "Peanut Butter",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/713GgVV-XoL._AC_UL165_SR165,165_.jpg",
        price: 500,
        discount: 40,
        description: "ALPINO Natural Peanut Butter Smooth - Made with 100% Roasted Peanuts ",
      },
      {
        id: 10,
        name: "SWASTH Little Millets",
        imageUrl: "https://m.media-amazon.com/images/I/41DBRzEJzXL._AC_UL320_.jpg",
        price: 500,
        discount: 30,
        description: "SWASTH Little Millets Unpolished And Natural Organic 900g",
      },
      {
        id: 11,
        name: "Tata Salt",
        imageUrl: "https://m.media-amazon.com/images/I/61-zRoFrfqL._SX679_.jpg",
        price: 500,
        discount: 30,
        description: "Fortune Soya Health Oil 5 Ltr",
      },
      {
        id: 12,
        name: "Fortune Chana Besan",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUiQ6ziloxs2SKw4DpcsgzNzecPTrD-QT0Q&s",
        price: 500,
        discount: 30,
        description: "Fortune Soya Health Oil 5 Ltr",
      },
     
    
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Calculate products to display for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = allProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="relative bg-white shadow-lg p-4">
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              {product.discount}% Off
            </div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-400 h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">₹{product.price}</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allProducts.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductDisplay;
