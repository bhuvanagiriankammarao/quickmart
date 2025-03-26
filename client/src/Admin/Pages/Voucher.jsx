import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheckCircle } from 'react-icons/fi';

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [newVoucher, setNewVoucher] = useState({ code: '', discount: '', expiry: '' });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({ ...newVoucher, [name]: value });
  };

  // Add a new voucher
  const addVoucher = () => {
    if (newVoucher.code && newVoucher.discount && newVoucher.expiry) {
      setVouchers([...vouchers, newVoucher]);
      setNewVoucher({ code: '', discount: '', expiry: '' });
    }
  };

  // Delete a voucher
  const deleteVoucher = (index) => {
    const updatedVouchers = vouchers.filter((_, i) => i !== index);
    setVouchers(updatedVouchers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
          <FiCheckCircle className="mr-2 text-green-500" size={30} />
          Voucher & Discount Management
        </h1>

        {/* Create New Voucher */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Create New Voucher</h2>
          <p className="text-gray-500 mb-4">Define discount codes with validity periods.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="code">Voucher Code</label>
              <input
                type="text"
                name="code"
                id="code"
                placeholder="e.g., SAVE20"
                value={newVoucher.code}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                name="discount"
                id="discount"
                placeholder="20"
                value={newVoucher.discount}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="expiry">Expiry Date</label>
              <input
                type="date"
                name="expiry"
                id="expiry"
                value={newVoucher.expiry}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={addVoucher}
            className={`mt-6 w-full flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition duration-300 ${
              !newVoucher.code || !newVoucher.discount || !newVoucher.expiry ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!newVoucher.code || !newVoucher.discount || !newVoucher.expiry}
          >
            <FiPlus className="mr-2" /> Add Voucher
          </button>
        </section>

        {/* Track Voucher Usage */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Track Voucher Usage</h2>
          <p className="text-gray-500 mb-4">Monitor which vouchers are being used.</p>
          {vouchers.length === 0 ? (
            <p className="text-gray-400">No vouchers added yet.</p>
          ) : (
            <div className="space-y-4">
              {vouchers.map((voucher, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
                  <div>
                    <p className="text-gray-800"><strong>Code:</strong> {voucher.code}</p>
                    <p className="text-gray-800"><strong>Discount:</strong> {voucher.discount}%</p>
                    <p className="text-gray-800"><strong>Expiry:</strong> {new Date(voucher.expiry).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => deleteVoucher(index)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                    title="Delete Voucher"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Apply Discounts to Products */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Apply Discounts to Products</h2>
          <p className="text-gray-500 mb-4">Associate vouchers with specific products or categories.</p>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <p className="text-gray-600">Implement functionality here to select products or categories and apply voucher discounts.</p>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Voucher;
