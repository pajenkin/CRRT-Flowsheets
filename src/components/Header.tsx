// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlockMHex from '../assets/BlockMHex.svg';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Logo and title */}
        <div className="flex items-center space-x-3">
          <img src={BlockMHex} alt="Logo" className="h-10 w-auto sm:h-12" />
          <Link to="/" className="text-xl font-semibold text-gray-800">
            CRRT Flowsheets
          </Link>
        </div>

        {/* Mobile: Hamburger/Close icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop: Nav tabs */}
        <nav className="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Calculator</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/hyponatremia" className="hover:text-blue-600 transition">Hyponatremia</Link>
          <Link to="/future" className="hover:text-blue-600 transition">Future</Link>
        </nav>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden px-4 pb-4 space-y-2 text-gray-700 text-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Calculator</Link>
            <Link to="/about" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/hyponatremia" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Hyponatremia</Link>
            <Link to="/future" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Future</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
