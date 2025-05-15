import React from 'react';
import { Link } from 'react-router-dom'; // Optional: if using React Router
import BlockMHex from '../assets/BlockMHex.svg';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* Left: Logo and title */}
      <div className="flex items-center space-x-3">
        <img 
          src={BlockMHex} 
          alt="Logo" 
          className="h-10 w-auto sm:h-12"
        />
        <span className="text-xl font-semibold text-gray-800">
          CRRT Flowsheets
        </span>
      </div>

      {/* Right: Nav tabs */}
      <nav className="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
        <a href="/work-with-code" className="hover:text-blue-600 transition">
          Work With Code
        </a>
        {/* Add more tabs here if needed */}
      </nav>
    </header>
  );
};

export default Header;