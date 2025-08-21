// src/components/Navbar.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy for sections
  useEffect(() => {
    const sections = ["features", "how-it-works", "team"];
    const handleScrollSpy = () => {
      let currentSection = "";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScrollSpy);
      return () => window.removeEventListener("scroll", handleScrollSpy);
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  const logoutHandler = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const dashboardPath =
    userInfo?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  const navLinks = [
    {
      name: "Features",
      href: "/#features",
      gradient: "from-sky-400 to-cyan-500",
    },
    {
      name: "How It Works",
      href: "/#how-it-works",
      gradient: "from-violet-400 to-purple-500",
    },
    { name: "Team", href: "/#team", gradient: "from-amber-400 to-orange-500" },
  ];

  const NavLinkItem = ({ href, children, gradient }) => {
    const isActive = activeSection === href.split("#")[1];
    return (
      <a
        href={href}
        className={`relative px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 ${
          isActive
            ? `text-white bg-gradient-to-r ${gradient} shadow-md`
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-md"
            : "bg-white/50 backdrop-blur-sm"
        }`}
      >
        <div className="container px-6 mx-auto">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="logo.png"
                alt="CivicConnect Logo"
                className="w-10 h-10 border-2 border-black rounded-full"
              />
              <span className="text-2xl font-bold text-gray-800">
                Civic<span className="text-teal-500">Connect</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="items-center hidden gap-2 lg:flex">
              {navLinks.map((link) => (
                <NavLinkItem
                  key={link.name}
                  href={link.href}
                  gradient={link.gradient}
                >
                  {link.name}
                </NavLinkItem>
              ))}
            </div>

            <div className="items-center hidden gap-2 lg:flex">
              {userInfo ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="px-4 py-2 text-sm font-bold text-white rounded-md shadow-lg shadow-teal-500/30 bg-gradient-to-r from-teal-400 to-cyan-500 hover:opacity-90"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="px-4 py-2 text-sm font-bold text-red-600 transition-colors rounded-md hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
                      location.pathname === "/login"
                        ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-bold text-white rounded-md shadow-lg shadow-teal-500/30 bg-gradient-to-r from-teal-400 to-cyan-500 hover:opacity-90"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-800"
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
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
          <div className="relative p-5 bg-white shadow-xl w-72 rounded-2xl">
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
                />
              </svg>
            </button>

            <h2 className="mb-5 text-xl font-semibold text-center text-slate-800">
              Menu
            </h2>

            <div className="flex flex-col gap-3">
              {/* Sections */}
              <a
                href="/#features"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-sky-400 to-cyan-500 hover:opacity-90"
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-violet-400 to-purple-500 hover:opacity-90"
              >
                How It Works
              </a>
              <a
                href="/#team"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90"
              >
                Team
              </a>

              {/* Auth Links */}
              {userInfo ? (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-emerald-400 to-emerald-500 hover:opacity-90"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-rose-400 to-rose-500 hover:opacity-90"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-indigo-400 to-indigo-600 hover:opacity-90"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-2 text-sm font-semibold text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-teal-400 to-teal-600 hover:opacity-90"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
