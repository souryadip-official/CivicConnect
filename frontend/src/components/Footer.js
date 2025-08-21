// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container px-6 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Civic<span className="text-teal-500">Connect</span>
            </h3>
            <p className="text-slate-400">
              Empowering rural communities by bridging the gap between residents and governance through technology.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/#features" className="transition-colors hover:text-teal-400">Features</a></li>
              <li><a href="/#how-it-works" className="transition-colors hover:text-teal-400">How It Works</a></li>
              <li><a href="/#team" className="transition-colors hover:text-teal-400">Team</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              {/* FIXED: Replaced <a> with <Link> */}
              <li><Link to="/privacy" className="transition-colors hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="transition-colors hover:text-teal-400">Terms of Use</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-teal-400">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-12 font-semibold text-center border-t border-slate-700 text-slate-500">
          <p>&copy; {new Date().getFullYear()} CivicConnect by QuadCore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;