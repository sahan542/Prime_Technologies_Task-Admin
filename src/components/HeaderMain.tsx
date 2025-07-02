"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignupModal";
import { useAppDispatch } from "@/store/hooks"; // adjust path if different
import { fetchProducts } from "@/store/actions";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/reducers/authSlice";

const HeaderMain = () => {
  // States for managing the dropdown and modal visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // Track signup modal state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(useCurrentUser);
  

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    setIsDropdownOpen(false);
  };
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true); // Open Sign Up modal
    setIsDropdownOpen(false); // Close the dropdown
  };
  const closeSignUpModal = () => setIsSignUpModalOpen(false); // Close Sign Up modal

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loglevel");
    console.log("Logged out");

    setIsDropdownOpen(false);

    fetch("http://localhost:8000/logout", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          console.log("Logged out on the server");
        } else {
          console.error("Failed to log out on the server");
        }
      })
      .catch((error) =>
        console.error("Error logging out on the server:", error)
      );

    const router = useRouter();
    router.push("/login");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="border-b border-gray-200 py-4 bg-white px-4 sm:px-6 lg:px-[60px]">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Top Row: Logo + Icons (on mobile/tablet) */}
        <div className="w-full flex items-center justify-between lg:justify-start lg:w-auto gap-4">
          {/* Logo */}
          <img
            src="/brizz bella.png"
            alt="Logo"
            className="w-[127.5px] sm:w-[180px]"
          />
          <div className="flex items-center gap-4">
            {/* Always show Shop All */}
            <Link
              href="/products"
              className="text-[#7b1f4b] hover:underline text-lg sm:text-lg block sm:inline"
            >
              <span className="block sm:inline w-full">Shop All</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[#7b1f4b] text-[22px] lg:hidden">
            <IoIosHeart className="cursor-pointer hover:text-[#7b1f4b]" />
            <div className="relative">
              <HiShoppingBag
                className="cursor-pointer hover:text-[#7b1f4b]"
                onClick={toggleCart}
              />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>
            <FaUser
              className="cursor-pointer hover:text-[#7b1f4b]"
              onClick={toggleDropdown}
            />
          </div>
        </div>

        {/* Icons (desktop only) aligned right */}
        <div className="hidden lg:flex gap-5 text-[#7b1f4b] text-[22px]">
          <FaUser
            className="cursor-pointer hover:text-[#7b1f4b]"
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {/* Dropdown Menu for User (mobile and desktop) */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-[#7b1f4b]">
          <button
            onClick={openSignInModal}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] text-[#7b1f4b]"
          >
            Sign In
          </button>
          <button
            onClick={openSignUpModal}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] text-[#7b1f4b]"
          >
            Register
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] text-[#7b1f4b]"
          >
            Logout
          </button>
        </div>
      )}

          <div className="flex gap-4">

            {/* Right side icons */}
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex gap-0">
                {/* <WishlistSheet /> */}
                {/* <CartSheet /> */}
              </div>

              {/* login/logout button */}
              <div className="flex items-center gap-4">
                {user ? (
                  <Button
                    className="cursor-pointer bg-orange-600 text-white hover:bg-white hover:text-orange-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="cursor-pointer bg-white text-[#5550A0] hover:bg-white/90"             onClick={openSignInModal}
>
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

      {/* SignIn Modal */}
      <SignInModal isOpen={isSignInModalOpen} closeModal={closeSignInModal} openSignUpModal={openSignUpModal}/>
      {/* SignUp Modal */}
      <SignUpModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal}/>
    </div>
  );
};

export default HeaderMain;
