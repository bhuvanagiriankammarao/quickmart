// src/components/UserManagement.js

import React, { useState } from 'react';
import { ordersData } from '../../data/index';

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // For selected order details
  const [users, setUsers] = useState([
    { id: 1, name: 'Arjun Reddy', status: 'Active' },
    { id: 2, name: 'Anita Desai', status: 'Active' },
    { id: 3, name: 'Ravi Kumar', status: 'Blocked' },
    { id: 4, name: 'Manoj Gupta', status: 'Blocked' },
    { id: 5, name: 'Pooja Sharma', status: 'Active' },
    { id: 6, name: 'Rahul Verma', status: 'Blocked' },
    { id: 7, name: 'Priya Menon', status: 'Active' },
  ]);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
        : user
    ));
  };

  const viewOrders = (userName) => {
    setSelectedUser(userName);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedOrder(null); // Close both user and order modals
  };

  const selectedUserOrders = ordersData.filter(order => order.customer === selectedUser);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      
      <div className="bg-white p-4 shadow-md rounded-lg mb-8">
        <h3 className="text-lg font-medium mb-3">Users</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.status}</td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-3 py-1 mr-2 rounded text-white ${user.status === 'Active' ? 'bg-red-500' : 'bg-green-500'}`}
                  >
                    {user.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                  <button
                    onClick={() => viewOrders(user.name)}
                    className="px-3 py-1 rounded bg-blue-500 text-white"
                  >
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for User's Orders */}
      {selectedUser && !selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-medium mb-3">{selectedUser}'s Orders</h3>
            {selectedUserOrders.length > 0 ? (
              <table className="w-full text-left border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="p-2 border-b">Order ID</th>
                    <th className="p-2 border-b">Date</th>
                    <th className="p-2 border-b">Amount</th>
                    <th className="p-2 border-b">Status</th>
                    <th className="p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUserOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="p-2 border-b">{order.id}</td>
                      <td className="p-2 border-b">{order.date} - {order.time}</td>
                      <td className="p-2 border-b">RS.{order.amount}</td>
                      <td className="p-2 border-b">{order.status}</td>
                      <td className="p-2 border-b">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="px-3 py-1 rounded bg-green-500 text-white"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No orders found for {selectedUser}.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-medium mb-3">Order Details: {selectedOrder.id}</h3>
            <p><strong>Date:</strong> {selectedOrder.date} - {selectedOrder.time}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Amount:</strong> RS.{selectedOrder.amount}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>

            <h4 className="mt-4 text-lg font-medium">Items:</h4>
            <ul className="list-disc ml-6">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="my-2">
                  {item.name} - Quantity: {item.quantity}, Price: ${item.price}
                </li>
              ))}
            </ul>

            <p className="mt-4"><strong>Shipping Fee:</strong> RS.{selectedOrder.shippingFee}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
