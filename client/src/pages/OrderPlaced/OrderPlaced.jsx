import React from 'react'
import { Link } from 'react-router-dom';
import OrderPlacedBanner from '../../section/OrderPlaced/OrderPlacedBanner';

const OrderPlaced = () => {
   
        const userEmail = "johnkevin@gmail.com"; // Replace with dynamic email if available
        const userPhone = "90123456789"; // Replace with dynamic phone number if available
      
  return (
    <div>
      <OrderPlacedBanner />
          <div className="flex items-center justify-center  bg-gray-100 p-4 sm:p-6">
    <main className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-xl h-full sm:h-auto max-h-screen text-center overflow-auto">
 
      
      <section className="flex flex-col justify-center h-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Thank you! Your order is <span className="text-green-500 font-bold">Placed.</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg mb-4 sm:mb-6">
          We’ve sent the order details to <strong>{userEmail}</strong> & <strong>{userPhone}</strong>
        </p>
        <Link to="/shop">
          <button className="bg-blue-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-blue-700 transition duration-200">
            Continue to Shop
          </button>
        </Link>
      </section>
    </main>
  </div>
    </div>

  )
}

export default OrderPlaced