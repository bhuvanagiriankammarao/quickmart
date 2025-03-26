import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Handle form submission to add a new address
  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddress = { name, phone, street, city, state, postalCode };
    setAddresses([...addresses, newAddress]); // Add the new address to the list
    setName(''); setPhone(''); setStreet(''); setCity(''); setState(''); setPostalCode(''); // Clear form fields
  };

  return (
    <div className="container mx-auto p-4 pt-24">
      <h2 className="font-semibold text-lg mb-4">Manage Addresses</h2>

      {/* Address Input Form */}
      <form onSubmit={handleAddAddress} className="p-4 border rounded-md shadow-md mb-8 bg-green-200">
        <h3 className="font-semibold text-lg mb-4">Add a New Address</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        
        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Address
        </button>
      </form>

      {/* Address List */}
      <div>
        {addresses.length === 0 ? (
          <p className="text-gray-600">No addresses saved.</p>
        ) : (
          addresses.map((address, index) => (
            <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-md">
              <div className="flex justify-between items-center">
                <div className="font-bold text-xs text-gray-500 uppercase">Home</div>
                <div className="text-gray-500 font-bold">⋮</div>
              </div>
              <h3 className="font-semibold text-lg">{address.name} {address.phone}</h3>
              <p>
                {address.street}, {address.city}, {address.state} -{' '}
                <span className="font-bold">{address.postalCode}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressManagement;
