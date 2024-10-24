// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';  // Import your Firebase configuration
import { createUserWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isPhone, setIsPhone] = useState(false); // Toggle between email and phone signup
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object
      await sendEmailVerification(user); // Send the verification email
      alert('Verification email sent! Please check your inbox.'); // Inform the user
      navigate('/'); // Redirect to Home after successful sign-up (or you may choose to redirect after verification)
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoneSignUp = async (e) => {
    e.preventDefault();
    try {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      alert('OTP has been sent to your phone.'); // Alert to indicate OTP sent
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      navigate('/'); // Redirect to Home after successful sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <button onClick={() => setIsPhone(false)} className={`mr-4 ${!isPhone ? 'font-bold' : ''}`}>Email</button>
        <button onClick={() => setIsPhone(true)} className={`${isPhone ? 'font-bold' : ''}`}>Phone</button>

        {isPhone ? (
          <form onSubmit={handlePhoneSignUp}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div id="recaptcha-container"></div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Send OTP
            </button>
            {verificationId && (
              <>
                <div className="mb-4 mt-4">
                  <label htmlFor="otp" className="block text-gray-700">OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleEmailSignUp}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
