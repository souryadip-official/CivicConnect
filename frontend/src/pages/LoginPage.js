// src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post('/api/users/login', { email, password }, config);

      login(data);

      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Error: Invalid email or password');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-amber-50 to-teal-50">
      
      {/* Floating leaf decorations */}
      <div className="absolute w-24 h-24 bg-green-200 rounded-full top-10 left-10 opacity-40 animate-bounce-slow"></div>
      <div className="absolute w-16 h-16 bg-teal-200 rounded-full opacity-50 bottom-20 right-10 animate-bounce-slower"></div>
      
      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white shadow-2xl rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-teal-700">Welcome Back!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Empowering <span className="font-semibold text-amber-600">communities</span>, one step at a time.
          </p>
        </div>
        
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">Email Address</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-teal-400">
              <Mail className="w-5 h-5 mr-3 text-gray-500" />
              <input
                className="flex-1 bg-transparent outline-none"
                id="email" type="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-teal-400">
              <Lock className="w-5 h-5 mr-3 text-gray-500" />
              <input
                className="flex-1 bg-transparent outline-none"
                id="password" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
          </div>

          {/* Button */}
          <div>
            <button 
              className="w-full px-4 py-3 font-bold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 hover:shadow-xl"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-teal-600 transition-colors hover:text-green-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
