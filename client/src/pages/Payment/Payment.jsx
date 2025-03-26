import React from 'react';
import axios from 'axios';

const Payment = () => {
  const handleRazorpayPayment = async (amount) => {
    try {
      // Create Razorpay order
      const { data: order } = await axios.post('/api/create-razorpay-order', { amount, currency: 'INR' });

      if (!order.id) {
        console.error('Error: Razorpay order ID not received');
        return;
      }

      // Razorpay options
      const options = {
        key: 'rzp_test_GsUAh2atNEW2CJ', 
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Your Company Name',
        description: 'Transaction for your purchase',
        handler: async (response) => {

          const verification = await axios.post('/api/verify-razorpay-payment', response);

          if (verification.data.success) {
            alert('Payment successful and verified!');
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new Razorpay(options);

      if (!rzp1) {
        console.error('Error: Razorpay object not created');
        return;
      }

      rzp1.open();
    } catch (error) {
      console.error('Error initiating Razorpay payment:', error);
    }
  };

  return (
    <div className=' pt-24'>
      <h1>Pay with Razorpay</h1>
      <button onClick={() => handleRazorpayPayment(500)}>Pay ₹500</button>
    </div>
  );
};

export default Payment;