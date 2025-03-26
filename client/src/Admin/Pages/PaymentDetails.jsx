// import React, { useEffect, useState } from "react";

// const PaymentDetails = () => {
//     const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Make sure to call the correct endpoint
//     fetch("http://localhost:5000/api/fetch-razorpay-payments") 
//       .then((response) => response.json())
//       .then((data) => {
//         setPayments(data.items || []); 
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching payments:", error);
//         setError("Failed to load payments");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading payments...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//            <h1>Admin Panel: Razorpay Payments</h1>
//            <table
//             border="1"
//             style={{
//               width: "100%",
//               textAlign: "left",
//               marginTop: "20px",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th>Payment ID</th>
//                 <th>Amount (INR)</th>
//                 <th>Status</th>
//                 <th>Order ID</th>
//                 <th>Method</th>
//                 <th>Card Info</th>
//                 <th>Customer Email</th>
//                 <th>Contact</th>
//                 <th>Fee (INR)</th>
//                 <th>Tax (INR)</th>
//                 <th>Created At</th>
//                </tr>
//             </thead>
//             <tbody>
//               {payments.map((payment) => (
//                 <tr key={payment.id}>
//                   <td>{payment.id}</td>
//                   <td>{(payment.amount / 100).toFixed(2)}</td>
//                   <td>{payment.status}</td>
//                   <td>{payment.order_id || "N/A"}</td>
//                   <td>{payment.method}</td>
//                   <td>
//                     {payment.card
//                       ? `${payment.card.network} ${payment.card.type} (${payment.card.last4})`
//                       : "N/A"}
//                   </td>
//                   <td>{payment.email}</td>
//                   <td>{payment.contact}</td>
//                   <td>{(payment.fee / 100).toFixed(2)}</td>
//                   <td>{(payment.tax / 100).toFixed(2)}</td>
//                   <td>{new Date(payment.created_at * 1000).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//          </div>
//   )
// }

// export default PaymentDetails


import React, { useEffect, useState } from "react";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/fetch-razorpay-payments") 
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.items || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setError("Failed to load payments");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading payments...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Panel: Razorpay Payments</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-200 text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border border-gray-300">Payment ID</th>
              <th className="p-3 border border-gray-300">Amount (INR)</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Order ID</th>
              <th className="p-3 border border-gray-300">Method</th>
              <th className="p-3 border border-gray-300">Card Info</th>
              <th className="p-3 border border-gray-300">Customer Email</th>
              <th className="p-3 border border-gray-300">Contact</th>
              <th className="p-3 border border-gray-300">Fee (INR)</th>
              <th className="p-3 border border-gray-300">Tax (INR)</th>
              <th className="p-3 border border-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{payment.id}</td>
                <td className="p-3 border border-gray-300">{(payment.amount / 100).toFixed(2)}</td>
                <td className="p-3 border border-gray-300 text-green-600 font-medium">{payment.status}</td>
                <td className="p-3 border border-gray-300">{payment.order_id || "N/A"}</td>
                <td className="p-3 border border-gray-300">{payment.method}</td>
                <td className="p-3 border border-gray-300">
                  {payment.card
                    ? `${payment.card.network} ${payment.card.type} (${payment.card.last4})`
                    : "N/A"}
                </td>
                <td className="p-3 border border-gray-300">{payment.email}</td>
                <td className="p-3 border border-gray-300">{payment.contact}</td>
                <td className="p-3 border border-gray-300">{(payment.fee / 100).toFixed(2)}</td>
                <td className="p-3 border border-gray-300">{(payment.tax / 100).toFixed(2)}</td>
                <td className="p-3 border border-gray-300">{new Date(payment.created_at * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
