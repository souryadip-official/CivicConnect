// frontend/src/pages/RegisterRolePage.js

import React from 'react';
import { Link } from 'react-router-dom';

// --- Icon Components ---
const OrganizationIcon = () => (
  <span className="text-4xl transition-transform group-hover:scale-110">🏛️</span>
);

const UserIcon = () => (
  <span className="text-4xl transition-transform group-hover:scale-110">👨‍👩‍👧‍👦</span>
);

const RegisterRolePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 pt-24 sm:pt-20 bg-gradient-to-br from-green-50 via-amber-50 to-emerald-100">
      
      {/* Header */}
      <div className="mb-10 text-center sm:mb-12">
        <h1 className="text-4xl font-extrabold md:text-5xl text-emerald-800">
          🌱 Join CivicConnect
        </h1>
        <p className="mt-4 text-lg text-emerald-700">
          Empower your village. Strengthen your community.
        </p>
      </div>
      
      {/* Cards */}
      <div className="flex flex-col w-full max-w-sm gap-8 md:flex-row lg:gap-12 md:max-w-4xl">

        {/* Organization */}
        <Link 
          to="/register/organization" 
          className="flex flex-col justify-between flex-1 p-8 transition-all duration-300 bg-white border-2 border-transparent shadow-lg group rounded-2xl hover:border-green-500 hover:-translate-y-2"
        >
          <div className="flex flex-col flex-grow gap-6">
            <div className="flex items-start gap-6">
              <OrganizationIcon />
              <div>
                <h2 className="text-2xl font-semibold text-emerald-800">As an Organization</h2>
                <p className="mt-2 text-emerald-700">
                  Register your <span className="font-medium">Gram Panchayat</span> or rural governing body 
                  to manage your community, address complaints, and share announcements.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button className="px-5 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
              Select Role
            </button>
          </div>
        </Link>

        {/* Resident */}
        <Link 
          to="/register/user" 
          className="flex flex-col justify-between flex-1 p-8 transition-all duration-300 bg-white border-2 border-transparent shadow-lg group rounded-2xl hover:border-amber-500 hover:-translate-y-2"
        >
          <div className="flex flex-col flex-grow gap-6">
            <div className="flex items-start gap-6">
              <UserIcon />
              <div>
                <h2 className="text-2xl font-semibold text-emerald-800">As a Resident</h2>
                <p className="mt-2 text-emerald-700">
                  Sign up to <span className="font-medium">report issues</span>, 
                  track your complaints, and actively engage with your local community.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button className="px-5 py-2 text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700">
              Select Role
            </button>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default RegisterRolePage;
