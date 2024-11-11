import React, { useState } from 'react';
import { ordersData as initialOrdersData } from '../../data';

const statusStyles = {
  Pending: 'bg-yellow-200 text-yellow-700',
  Processing: 'bg-blue-200 text-blue-700',
  Completed: 'bg-green-200 text-green-700',
  Cancelled: 'bg-red-200 text-red-700',
};

const Orders = () => {
  const [ordersData, setOrdersData] = useState(initialOrdersData);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [notification, setNotification] = useState({ message: '', visible: false });

  const openStatusPopup = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowPopup(true);
  };

  const openDetailsPopup = (order) => {
    setSelectedOrder(order);
    setShowDetailsPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowDetailsPopup(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  const handleStatusChange = () => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setNotification({
      message: `Order ${selectedOrder.id} status changed to ${newStatus}`,
      visible: true,
    });

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: '', visible: false });
    }, 3000);

    closePopup();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>

      {notification.visible && (
  <div className="fixed top-4 right-[28rem] bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-xl shadow-xl flex items-center space-x-3 transition-transform transform-gpu duration-300 ease-out animate-bounce">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M3 3h2l.4 2M7 13h10l3-8H6.4L5.2 5H3m4 12a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
    <span className="font-semibold">{notification.message}</span>
  </div>
)}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b-2 text-left">Order ID</th>
              <th className="py-3 px-4 border-b-2 text-left">Customer</th>
              <th className="py-3 px-4 border-b-2 text-left">Date</th>
              <th className="py-3 px-4 border-b-2 text-left">Time</th>
              <th className="py-3 px-4 border-b-2 text-left">Amount</th>
              <th className="py-3 px-4 border-b-2 text-left">Status</th>
              <th className="py-3 px-4 border-b-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{order.id}</td>
                <td className="py-3 px-4 border-b">{order.customer}</td>
                <td className="py-3 px-4 border-b">{order.date}</td>
                <td className="py-3 px-4 border-b">{order.time}</td>
                <td className="py-3 px-4 border-b">RS.{Number(order.amount).toFixed(2)}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold cursor-pointer ${statusStyles[order.status]}`}
                    onClick={() => openStatusPopup(order)}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => openDetailsPopup(order)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Update Status for Order {selectedOrder.id}</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
       {showDetailsPopup && selectedOrder && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg transform transition-all duration-300">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">
          Order Details for #{selectedOrder.id}
        </h3>
        <button
          onClick={closePopup}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        <p className="text-gray-600"><strong>Customer:</strong> {selectedOrder.customer}</p>
        <p className="text-gray-600"><strong>Date:</strong> {selectedOrder.date} at {selectedOrder.time}</p>
        <p className="text-gray-600"><strong>Address:</strong> {selectedOrder.address}</p>
        <p className="text-gray-600"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
        <p className="text-gray-600"><strong>Items:</strong></p>
        <ul className="list-disc pl-5 text-gray-600">
          {selectedOrder.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price} = <span className="font-semibold">${item.quantity * item.price}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600"><strong>Shipping Fee:</strong> ${selectedOrder.shippingFee}</p>
        <p className="text-gray-800 font-bold"><strong>Total Amount:</strong> ${selectedOrder.amount}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={closePopup}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Orders;