"use client";

import React, { useState } from "react";
import { metadata } from './config/metadata';
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import Navbars from "@/components/shared/Ui/Navbar/Navbar";
import Footer from "@/components/Footer";
import { AuthModalProvider } from "@/components/context/AuthModalContext";
import { AuthProvider } from "@/context/AuthContext";
import SignInModal from "@/components/modals/SignInModal";
import SignupModal from "@/components/modals/SignupModal";
import Sidebar from "@/components/Sidebar";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);  // Toggle for mobile sidebar

  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => setSignInOpen(false);
  const openSignUpModal = () => setSignUpOpen(true);
  const closeSignUpModal = () => setSignUpOpen(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);  // Function to toggle sidebar on mobile

  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{String(metadata.title || '')}</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}> {/* Wrap your app with the Redux Provider */}
          <PersistGate loading={null} persistor={persistor}>
            
          <AuthProvider>
            <AuthModalProvider>
              {/* Header Section */}
              {/* <HeaderMain /> */}
              <Navbars/>
              {/* <Navbar /> */}
              {/* Main Layout */}
              <div className="flex bg-white h-screen">
                {/* Sidebar */}
              <div 
                className={`
                  lg:w-1/5 md:w-1/4 w-full
                  bg-[#f4dce6] text-white
                  fixed lg:relative
                  left-0 top-0
                  h-screen
                  overflow-hidden
                  z-40
                  transition-all duration-300
                  ${sidebarOpen ? 'block' : 'hidden'} lg:block
                `}
              >
                <div className="h-full w-full overflow-hidden">
                  <Sidebar />
                </div>
              </div>


                {/* Content Area */}
                <div className={`lg:w-4/5 md:w-3/4 w-full ml-0 lg:ml-1/3 p-6 transition-all duration-300`}>
                  {/* Toggle Button for mobile */}
                  <button 
                    onClick={toggleSidebar} 
                    className="lg:hidden fixed top-16 left-4 z-50 p-3 bg-gray-800 text-white rounded-full"
                  >
                    <i className="fas fa-bars"></i> {/* Submarine icon */}
                  </button>
                  <main>{children}</main>
                </div>
              </div>

              {/* Modals */}
              <SignupModal isOpen={isSignUpOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal} />
              <SignInModal isOpen={isSignInOpen} closeModal={closeSignInModal} openSignUpModal={openSignUpModal}/>
              <ToastContainer position="top-right" autoClose={3000} />

              <Footer/>
            </AuthModalProvider>
          </AuthProvider>
          </PersistGate>

        </Provider>
      </body>
    </html>
  );
}
