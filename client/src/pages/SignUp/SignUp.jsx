import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendEmailVerification,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SignUpbg from "../../assets/images/signUpbg.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState(false); // Success modal state
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      setSuccessMessage(true); // Show success modal
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoneSignUp = async (e) => {
    e.preventDefault();
    try {
      const appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      alert("OTP has been sent to your phone.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);

      await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber, password }),
      });

      setSuccessMessage(true); // Show success modal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen pt-24">
      <div className="hidden lg:flex flex-[0.51]">
        <img
          src={SignUpbg}
          alt="Sign Up"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-center items-center flex-[0.6] max-w-xl mx-auto p-8 shadow-lg bg-white ">
        <img src={logo} alt="Logo" className="w-26 h-20 mb-6" />
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Sign Up</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsPhone(false)}
            className={`px-4 py-2 mx-2 rounded-lg ${
              !isPhone ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700"
            } transition`}
          >
            Email
          </button>
          <button
            onClick={() => setIsPhone(true)}
            className={`px-4 py-2 mx-2 rounded-lg ${
              isPhone ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700"
            } transition`}
          >
            Phone
          </button>
        </div>

        {isPhone ? (
          <form onSubmit={handlePhoneSignUp} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-1"
              >
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
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors mb-4"
            >
              Send OTP
            </button>

            {verificationId && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block text-gray-700 font-medium mb-1"
                  >
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
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleEmailSignUp} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
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
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
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
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Success Modal */}
        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-green-700">
                Successfully Signed Up!
              </h3>
              <p className="mt-4">
                Welcome, {name}! Your account has been created successfully.
              </p>
              <button
                onClick={() => {
                  setSuccessMessage(false);
                  navigate("/");
                }}
                className="mt-6 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
