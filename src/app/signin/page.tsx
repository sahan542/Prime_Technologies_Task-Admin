'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInModal from '@/components/modals/SignInModal';  // Import SignInModal
import { RootState } from '@/redux/store';  // Access the Redux store

const SignInPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);  // Modal open by default
  const token = useSelector((state: RootState) => state.auth.token);  // Get token from Redux store

  useEffect(() => {
    // If token is available, close the modal automatically
    if (token) {
      setIsOpen(false);  // Close the modal if user is authenticated
    }
  }, [token]);  // Run whenever the token changes

  const closeModal = () => {
    if (!token) {
      setIsOpen(false);  // Allow closing only if not authenticated
    }
  };

  const openSignUpModal = () => {
    // Your logic for opening the SignUp modal
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <SignInModal
        isOpen={isOpen}
        closeModal={closeModal}
        openSignUpModal={openSignUpModal}
      />
    </div>
  );
};

export default SignInPage;
