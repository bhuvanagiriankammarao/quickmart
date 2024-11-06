import React, { useState } from 'react';
import { auth } from "../../firebaseConfig"; // Adjust as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Import your logo image
import SignUpbg from '../../assets/images/signUpbg.png'; // Replace with your image path

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to Home after sign-in
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="hidden lg:flex flex-[0.51]">
        <img
          src={SignUpbg}
          alt="Sign In"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col mt-10 justify-center items-center flex-[0.6] max-w-xl mx-auto p-8 shadow-lg bg-white">
        <img src={logo} alt="Logo" className="w-26 h-20 mb-6" />
        <h2 className="text-2xl font-bold text-blue-700 mb-6"> Log In</h2>
        <form onSubmit={handleSignIn} className="w-full">
          {error && (
            <p className="text-red-600 mb-4 text-center">{error}</p>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              User ID
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-gray-700">
          New User?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
