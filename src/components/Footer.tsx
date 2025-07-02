'use client';
import React from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">

      {/* Bottom Bar */}
      <div className="bg-black text-white text-sm py-4 px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 beautymart.lk. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="underline">Terms Of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
