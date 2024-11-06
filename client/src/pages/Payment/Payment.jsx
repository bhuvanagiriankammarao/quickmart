import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from "../../store/cartSlice"; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import CheckoutBanner from '../../section/Checkout/CheckoutBanner';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
    const totalPrice = useSelector(selectTotalPrice); // Fetch total price from the cart
    const navigate = useNavigate();

    const handleOrderPlacement = (e) => {
        e.preventDefault();
        navigate('/orderplaced');
    };

    return (
        <div>
            <CheckoutBanner />
                    <div className="min-h-screen flex flex-col items-center py-8 bg-gray-100">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Billing Details Form */}
                <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Billing details</h2>
                    <form onSubmit={handleOrderPlacement} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="First name" className="border p-3 rounded" required />
                        <input type="text" placeholder="Last name" className="border p-3 rounded" required />
                        <input type="text" placeholder="Company name (Optional)" className="border p-3 rounded" />
                        <input type="text" placeholder="Country / Region" className="border p-3 rounded" required />
                        <input type="text" placeholder="Street address" className="border p-3 rounded" required />
                        <input type="text" placeholder="Town / City" className="border p-3 rounded" required />
                        <input type="text" placeholder="Province" className="border p-3 rounded" required />
                        <input type="text" placeholder="ZIP code" className="border p-3 rounded" required />
                        <input type="email" placeholder="Email address" className="border p-3 rounded" required />
                        <textarea placeholder="Additional information" className="border p-3 rounded md:col-span-2" rows="4"></textarea>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Product Summary</h2>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>₹{totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between font-bold text-xl text-orange-600 mt-4">
                            <p>Total</p>
                            <p>₹{totalPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank_transfer"
                                    checked={paymentMethod === 'bank_transfer'}
                                    onChange={() => setPaymentMethod('bank_transfer')}
                                    className="mr-2"
                                />
                                Direct Bank Transfer
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash_on_delivery"
                                    checked={paymentMethod === 'cash_on_delivery'}
                                    onChange={() => setPaymentMethod('cash_on_delivery')}
                                    className="mr-2"
                                />
                                Cash on Delivery
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash_on_delivery"
                                    checked={paymentMethod === 'cash_on_delivery'}
                                    onChange={() => setPaymentMethod('cash_on_delivery')}
                                    className="mr-2"
                                />
                                Card Payment
                            </label>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handleOrderPlacement}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Place order
                    </button>
                </div>
            </div>
        </div>
        </div>

    );
};

export default Payment;
