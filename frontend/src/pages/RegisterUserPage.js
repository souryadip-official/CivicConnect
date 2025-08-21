// frontend/src/pages/RegisterUserPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';
import { User, Phone, Mail, Lock, Calendar, Users, Home, MapPin, FileText } from 'lucide-react';

const RegisterUserPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [parentName, setParentName] = useState('');
  const [householdHead, setHouseholdHead] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [voterId, setVoterId] = useState('');
  const [ruralBodyId, setRuralBodyId] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data } = await axios.get('/api/organizations');
        setOrganizations(data);
        setLoading(false);
      } catch (error) {
        console.error("Could not fetch organizations", error);
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!ruralBodyId) {
      alert('Please select your Gram Panchayat.');
      return;
    }

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post('/api/users/register', {
        name, email, password, phone, ruralBodyId,
        dob, gender, occupation, maritalStatus, parentName, householdHead,
        address, landmark, aadhaar, voterId
      }, config);
      alert('🎉 Registration Successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Registration failed.'}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-28 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="w-full max-w-5xl p-8 bg-white border shadow-xl rounded-2xl border-emerald-200">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-emerald-700">
            🌱 Resident Registration
          </h2>
          <p className="mt-2 font-semibold text-gray-600">
            Join Civic Connect and help build stronger, smarter villages.  
          </p>
        </div>

        <form onSubmit={submitHandler} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Section: Basic Info */}
          <div className="flex items-center gap-2 pb-2 mb-2 text-lg font-semibold border-b text-emerald-700 lg:col-span-3">
            <User className="w-5 h-5" /> Basic Information
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Full Name</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Phone Number</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Email Address</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Date of Birth</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Gender</label>
            <select className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select...</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Occupation</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Marital Status</label>
            <select className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required>
              <option value="">Select...</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Father/Mother's Name</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Head of Household</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={householdHead} onChange={(e) => setHouseholdHead(e.target.value)} required />
          </div>

          {/* Address Info */}
          <div className="flex items-center gap-2 pb-2 mt-4 mb-2 text-lg font-semibold border-b text-emerald-700 lg:col-span-3">
            <Home className="w-5 h-5" /> Address Information
          </div>
          <div className="lg:col-span-3">
            <textarea placeholder="Enter your full address" className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Landmark</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} required />
          </div>

          {/* Document Info */}
          <div className="flex items-center gap-2 pb-2 mt-4 mb-2 text-lg font-semibold border-b text-emerald-700 lg:col-span-3">
            <FileText className="w-5 h-5" /> Document Information
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Aadhaar Number</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Voter ID (Optional)</label>
            <input className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              type="text" value={voterId} onChange={(e) => setVoterId(e.target.value)} />
          </div>

          {/* Panchayat Selection */}
          <div className="flex items-center gap-2 pb-2 mt-4 mb-2 text-lg font-semibold border-b text-emerald-700 lg:col-span-3">
            <MapPin className="w-5 h-5" /> Governing Body
          </div>
          <div className="lg:col-span-3">
            <select className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-400"
              value={ruralBodyId} onChange={(e) => setRuralBodyId(e.target.value)} required>
              <option value="">{loading ? 'Loading...' : 'Select your Gram Panchayat'}</option>
              {!loading && organizations.map(org => (
                <option key={org._id} value={org._id}>{org.name}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="mt-6 lg:col-span-3">
            <button className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg hover:from-emerald-600 hover:to-green-700 transform transition hover:scale-[1.01]"
              type="submit">
              🌍 Create My Account
            </button>
          </div>
        </form>

        <p className="mt-6 font-semibold text-center text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUserPage;
