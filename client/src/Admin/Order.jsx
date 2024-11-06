// import React, { useState } from 'react';
// import { ordersData as initialOrdersData } from '../../data';

// const statusStyles = {
//   Pending: 'bg-yellow-200 text-yellow-700',
//   Processing: 'bg-blue-200 text-blue-700',
//   Completed: 'bg-green-200 text-green-700',
//   Cancelled: 'bg-red-200 text-red-700',
// };

// const Orders = () => {
//   const [ordersData, setOrdersData] = useState(initialOrdersData);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [newStatus, setNewStatus] = useState("");

//   const openPopup = (order) => {
//     setSelectedOrder(order);
//     setNewStatus(order.status);
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setSelectedOrder(null);
//     setNewStatus("");
//   };

//   const handleStatusChange = () => {
//     setOrdersData((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === selectedOrder.id ? { ...order, status: newStatus } : order
//       )
//     );
//     closePopup();

//     // Optional: Persist this change to a server
//     // await fetch('/api/updateOrderStatus', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ id: selectedOrder.id, status: newStatus }),
//     // });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>

//       <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="py-3 px-4 border-b-2 text-left">Order ID</th>
//               <th className="py-3 px-4 border-b-2 text-left">Customer</th>
//               <th className="py-3 px-4 border-b-2 text-left">Date</th>
//               <th className="py-3 px-4 border-b-2 text-left">Amount</th>
//               <th className="py-3 px-4 border-b-2 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ordersData.map((order) => (
//               <tr key={order.id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{order.id}</td>
//                 <td className="py-3 px-4 border-b">{order.customer}</td>
//                 <td className="py-3 px-4 border-b">{order.date}</td>
//                 <td className="py-3 px-4 border-b">${Number(order.amount).toFixed(2)}</td>
//                 <td className="py-3 px-4 border-b">
//                   <span
//                     className={`px-3 py-1 rounded-full font-semibold cursor-pointer ${statusStyles[order.status]}`}
//                     onClick={() => openPopup(order)}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pop-up window for status update */}
//       {showPopup && selectedOrder && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//             <h3 className="text-xl font-semibold mb-4">Update Status for Order {selectedOrder.id}</h3>
//             <select
//               value={newStatus}
//               onChange={(e) => setNewStatus(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md mb-4"
//             >
//               <option value="Pending">Pending</option>
//               <option value="Processing">Processing</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={closePopup}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleStatusChange}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;






















import React, { useState } from 'react';
import { ordersData as initialOrdersData } from '../data';

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
    closePopup();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b-2 text-left">Order ID</th>
              <th className="py-3 px-4 border-b-2 text-left">Customer</th>
              <th className="py-3 px-4 border-b-2 text-left">Date</th>
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
                <td className="py-3 px-4 border-b">${Number(order.amount).toFixed(2)}</td>
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

      {/* Status Update Pop-up */}
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

      {/* Order Details Pop-up */}
      {showDetailsPopup && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Order Details for {selectedOrder.id}</h3>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-disc pl-5">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                </li>
              ))}
            </ul>
            <p><strong>Shipping Fee:</strong> ${selectedOrder.shippingFee}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.amount}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
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
