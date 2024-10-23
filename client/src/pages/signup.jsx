import React, { useState } from 'react';
import './SignupForm.css'; // Make sure to have the correct path for the CSS file

const SignupForm = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSignup = (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    // Show loading indicator while submitting
    setLoading(true);

    // Simulate form submission (e.g., send data to server)
    setTimeout(() => {
      console.log('Signed up with email:', email);
      console.log('Password:', password);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="signup-page-container">
      <div className="image-container">
        <img src="https://as1.ftcdn.net/v2/jpg/00/97/65/54/1000_F_97655418_RqD6GHoyr7pv6iaMx7DG85l0hXunUHDm.jpg" alt="Signup" className="signup-image" />
      </div>

      <div className="signup-form-container">
        <h2>Sign Up</h2>

        {/* Error message display */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="show-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <div className="login-caption">
            <p>Already have an account?</p>
            <button
              className="login-button"
              onClick={() => window.location.href = '/login'}
            >
              Go to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;


