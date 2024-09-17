"use client"; // Mark Sidebar as a Client Component

import Link from "next/link";
import { useState } from "react";
import { FiX, FiChevronDown, FiChevronUp, FiUser, FiShoppingCart, FiHeart, FiBell } from "react-icons/fi"; // Icons for sidebar
import { FaFacebook } from "react-icons/fa"; // Import social media icon if needed

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-75 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="relative w-64 h-full bg-white shadow-lg p-6">
        {/* Close Icon */}
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-gray-900">
          <FiX size={24} />
        </button>

        {/* Login & Signup */}
        <div className="flex items-center space-x-2 mb-8">
          <FiUser size={24} className="text-blue-500" />
          <Link href="/login" className="text-blue-600 font-semibold" onClick={toggleSidebar}>
            Login & Signup
          </Link>
          <FaFacebook size={20} className="text-blue-500" />
        </div>

        {/* Sidebar Links */}
        <div className="mt-4">
         
          <div className="mb-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block text-lg font-semibold w-full text-left"
            >
              <FiChevronDown size={20} className="inline-block mr-2" />
              All Categories
              {dropdownOpen ? (
                <FiChevronUp size={20} className="inline-block ml-2" />
              ) : (
                <FiChevronDown size={20} className="inline-block ml-2" />
              )}
            </button>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/categories/imitation-jewellery" className="block" onClick={toggleSidebar}>
                  Imitation Jewellery
                </Link>
                {/* Add more categories */}
              </div>
            )}
          </div>

          <Link href="/more-on-site" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            More on site
          </Link>
          
          <Link href="/offer-zone" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            Offer Zone
          </Link>
          <Link href="/Become Seller" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            Become Seller
          </Link>

          {/* Additional Links */}
          <Link href="/my-orders" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            My Orders
          </Link>
          <Link href="/my-cart" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            My Cart
          </Link>
          <Link href="/my-wishlist" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            My Wishlist
          </Link>
          <Link href="/my-account" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            My Account
          </Link>
          <Link href="/my-notifications" className="block text-lg font-semibold mb-4" onClick={toggleSidebar}>
            <FiBell size={20} className="inline-block mr-2" />
            My Notifications
          </Link>

        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
