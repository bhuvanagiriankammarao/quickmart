import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SignUpbg from "../../assets/images/signUpbg.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (email === "admin@123" && password === "123456") {
        navigate("/admin");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false); 
          navigate("/"); 
        }, 2000);
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage("");
    setError("");
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage(
        "Password reset email sent successfully. Check your inbox!"
      );
    } catch (err) {
      setError(
        "Failed to send password reset email. Please check the email entered."
      );
    }
  };

  return (
    <>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center
         bg-black bg-opacity-50 z-50 font-poppins ">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-green-600 mb-2 text-center">
              Successfully Logged In!
            </h2>
            <p className="text-gray-700 text-center">Redirecting...</p>
          </div>
        </div>
      )}

      <div className="flex h-screen pt-24">
        <div className="hidden lg:flex flex-[0.51]">
          <img
            src={SignUpbg}
            alt="Sign In"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col mt-10 justify-center items-center flex-[0.6] max-w-xl mx-auto p-8 shadow-lg bg-white">
          <img src={logo} alt="Logo" className="w-26 h-20 mb-6" />
          <h2 className="text-2xl font-bold text-blue-700 mb-6"> Log In</h2>
          <form onSubmit={handleSignIn} className="w-full">
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            {resetMessage && (
              <p className="text-green-600 mb-4 text-center">{resetMessage}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
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
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
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
                onClick={handlePasswordReset}
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
            New User?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
