// frontend/src/pages/RegisterOrgPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterOrgPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orgName: '',
    regNumber: '',
    orgEmail: '',
    orgPhone: '',
    orgAddress: '',
    contactName: '',
    contactPosition: '',
    contactEmail: '',
    contactPhone: '',
    password: '',
  });

  const { orgName, regNumber, orgEmail, orgPhone, orgAddress, contactName, contactPosition, contactEmail, contactPhone, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post('/api/organizations/register', formData, config);
      alert('Organization registered successfully! Please log in with the representative\'s credentials.');
      navigate('/login');
    } catch (error) {
      alert(`Error: ${error.response.data.message || 'Registration failed.'}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 pt-28">
      <div className="w-full max-w-3xl p-10 bg-white border border-gray-100 shadow-xl rounded-2xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-teal-700">🏕️ Register Your Organisation</h2>
          <p className="mt-2 text-lg font-semibold text-gray-600">
            Empowering rural communities through verified civic connections.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* --- Organisation Details --- */}
          <div className="md:col-span-2">
            <h3 className="pb-2 mb-4 text-2xl font-semibold text-teal-600 border-b">
              Organisation Details
            </h3>
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="orgName">Organisation Name</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="orgName" type="text" value={orgName} onChange={onChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="regNumber">Registration Number</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="regNumber" type="text" value={regNumber} onChange={onChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="orgEmail">Official Email</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="orgEmail" type="email" value={orgEmail} onChange={onChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="orgPhone">Phone Number (Landline)</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="orgPhone" type="tel" value={orgPhone} onChange={onChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="orgAddress">Full Address</label>
            <textarea className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="orgAddress" rows="3" value={orgAddress} onChange={onChange} required></textarea>
          </div>

          {/* --- Representative / Admin Details --- */}
          <div className="mt-6 md:col-span-2">
            <h3 className="pb-2 mb-4 text-2xl font-semibold text-teal-600 border-b">
              Representative & Admin Account
            </h3>
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="contactName">Representative Name</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="contactName" type="text" value={contactName} onChange={onChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="contactPosition">Position</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="contactPosition" type="text" value={contactPosition} onChange={onChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="contactEmail">Representative Email (Login ID)</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="contactEmail" type="email" value={contactEmail} onChange={onChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="contactPhone">Representative Phone</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="contactPhone" type="tel" value={contactPhone} onChange={onChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">Set Admin Password</label>
            <input className="w-full px-4 py-3 bg-gray-100 rounded-lg" id="password" type="password" value={password} onChange={onChange} required />
          </div>

          {/* Submit */}
          <div className="mt-6 md:col-span-2">
            <button className="w-full px-4 py-3 font-bold text-white transition bg-teal-600 rounded-lg shadow hover:bg-teal-700">
              Register Organisation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOrgPage;
