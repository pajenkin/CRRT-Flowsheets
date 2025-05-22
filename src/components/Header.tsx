// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="text-xl font-semibold text-gray-800">
          CRRT
        </Link>
      </div>

      {/* Right: Nav tabs */}
      <nav className="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
        <Link to="/about" className="hover:text-blue-600 transition">
          About
        </Link>
        <Link to="/" className="hover:text-blue-600 transition">
          Calculator
        </Link>
        <Link to="/hyponatremia" className="hover:text-blue-600 transition">
          Hyponatremia
        </Link>
        <Link to="/future" className="hover:text-blue-600 transition">
          Future
        </Link>
      </nav>
    </header>
  );
};

export default Header;