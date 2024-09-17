"use client";  // This line makes the component a Client Component

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Menu Icon */}
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          MyApp
        </Link>

        {/* Icons */}
        <div className="flex space-x-4 text-white">
          <FiSearch size={24} className="cursor-pointer" />
          <FiShoppingCart size={24} className="cursor-pointer" />
          <FiUser size={24} className="cursor-pointer" />
        </div>

        {/* Sidebar Component for mobile */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </nav>
  );
};

export default Navbar;
