import React, { useState } from 'react';
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendEmailVerification,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import logo from '../../assets/images/logo.png';
import SignUpbg from '../../assets/images/signUpbg.png'; // Replace with your image path

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert('Verification email sent! Please check your inbox.');
      navigate('/');
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
      alert('OTP has been sent to your phone.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="hidden lg:flex flex-[0.51]">
        <img
          src={SignUpbg}
          alt="Sign Up"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center flex-[0.6] max-w-xl mx-auto p-8 shadow-lg bg-white">
        <img src={logo} alt="Logo" className="w-26 h-20 mb-6" />
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Sign Up</h2>

        {error && (
          <p className="text-red-600 mb-4 text-center">{error}</p>
        )}

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsPhone(false)}
            className={`px-4 py-2 mx-2 rounded-lg ${!isPhone ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700'} transition`}
          >
            Email
          </button>
          <button
            onClick={() => setIsPhone(true)}
            className={`px-4 py-2 mx-2 rounded-lg ${isPhone ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700'} transition`}
          >
            Phone
          </button>
        </div>

        {isPhone ? (
          <form onSubmit={handlePhoneSignUp} className="w-full">
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div id="recaptcha-container"></div>
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors mb-4">
              Send OTP
            </button>

            {verificationId && (
              <>
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">
                    OTP:
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button onClick={handleVerifyOtp} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Verify OTP
                </button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleEmailSignUp} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
