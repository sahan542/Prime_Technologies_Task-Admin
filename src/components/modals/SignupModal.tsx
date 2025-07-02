'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface SignUpModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openSignInModal: () => void; // Pass the function to open the SignIn modal
}

export default function SignupModal({ isOpen, closeModal, openSignInModal }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:8000/auth/signup', {
        email,
        password,
      });
      alert('Account created successfully!');
      closeModal();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Don't render the modal if it's not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Transparent Background */}
      <div className="fixed inset-0 bg-transparent" /> {/* Remove black background */}

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg z-50 w-full max-w-sm shadow-xl backdrop-blur-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-[#7b1f4b] mb-4">Register</h2>
          <button
            onClick={closeModal}
            className="text-2xl mb-4 font-semibold text-gray-500 hover:text-[#7b1f4b]"
          >
            &times; {/* Close button */}
          </button>
        </div>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Email input */}
        <label className="block text-sm font-medium text-black">
          Email <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-3 text-black bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <label className="block text-sm font-medium text-black">
          Password <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button
          onClick={handleSignup}
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {/* Sign In link */}
        <p className="text-black mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              closeModal(); // Close the SignUp modal
              openSignInModal(); // Open the SignIn modal
            }}
            className="text-[#7b1f4b] font-semibold hover:underline"
          >
            SignIn
          </button>
        </p>
      </div>
    </div>
  );
}
