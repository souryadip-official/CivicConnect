// src/components/AdminNavbar.js

import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const linkClasses =
    "px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors";
  const activeLinkClasses =
    "px-4 py-2 rounded-md text-sm font-semibold text-white bg-emerald-600 shadow-md";

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 mx-auto border-2 border-black rounded-full"
              />
              <span className="text-xl font-bold text-slate-800">
                Admin <span className="text-emerald-600">Panel</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="items-center hidden gap-4 md:flex">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive ? activeLinkClasses : linkClasses
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/residents"
                className={({ isActive }) =>
                  isActive ? activeLinkClasses : linkClasses
                }
              >
                Residents
              </NavLink>
              <NavLink to="/admin/announcements" className={({ isActive }) => isActive ? activeLinkClasses : linkClasses}>
                Announcements
              </NavLink>
              
              <button
                onClick={logoutHandler}
                className="px-4 py-2 text-sm font-semibold text-red-600 transition-colors rounded-md hover:bg-red-50"
              >
                Logout
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-slate-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Popup Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
          <div className="relative p-5 transition-all duration-300 transform scale-100 bg-white shadow-xl opacity-100 w-72 rounded-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute p-2 top-3 right-3 text-slate-500 hover:text-red-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            {/* Menu Header */}
            <h2 className="mb-5 text-xl font-semibold text-center text-slate-800">
              Admin Menu
            </h2>

            {/* Links */}
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/residents"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600"
              >
                Residents
              </Link>
              
              <Link
                to="/admin/announcements"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600"
              >
                Announcements
              </Link>
              
              <button
                onClick={logoutHandler}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600" 
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
