// frontend/src/pages/DashboardPage.js

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import UserComplaintModal from '../components/UserComplaintModal';

const DashboardPage = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myComplaints, setMyComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  
  // FIXED: State now holds the full complaint object, not just the ID
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (userInfo) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const [statsRes, complaintsRes] = await Promise.all([
          axios.get('/api/complaints/mystats', config),
          axios.get('/api/complaints/mycomplaints', config)
        ]);
        setStats(statsRes.data);
        setMyComplaints(complaintsRes.data);
      } catch (error) {
        if (error.response && error.response.status === 401) logout();
      } finally {
        setLoading(false);
      }
    }
  }, [userInfo, logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // FIXED: This function now receives the entire complaint object
  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };

  const getStatusPill = (status) => {
    let baseClasses = "px-3 py-1 text-xs font-bold rounded-full capitalize";
    if (status === 'pending') return `${baseClasses} bg-yellow-100 text-yellow-800`;
    if (status === 'in_progress') return `${baseClasses} bg-blue-100 text-blue-800`;
    if (status === 'resolved') return `${baseClasses} bg-green-100 text-green-800`;
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col justify-between mb-8 md:flex-row md:items-center md:mb-12">
          <div>
            <h1 className="text-3xl font-extrabold lg:text-4xl text-slate-800">Welcome, {userInfo ? userInfo.name.split(' ')[0] : 'User'}!</h1>
            <p className="mt-2 text-base text-slate-500 lg:text-lg">Track your contributions to the community.</p>
          </div>
          <Link to="/create-complaint" className="w-full mt-4 md:mt-0 md:w-auto">
            <button className="flex items-center justify-center w-full px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span>Report New Issue</span>
            </button>
          </Link>
        </div>

        {stats && (
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3 md:gap-6 md:mb-12">
            <div className="p-6 bg-white border shadow-lg rounded-2xl"><p className="text-sm font-medium text-slate-500">Total Complaints</p><p className="mt-1 text-3xl font-bold text-slate-800">{stats.totalComplaints}</p></div>
            <div className="p-6 bg-white border shadow-lg rounded-2xl"><p className="text-sm font-medium text-slate-500">In Progress</p><p className="mt-1 text-3xl font-bold text-blue-600">{stats.inProgressComplaints}</p></div>
            <div className="p-6 bg-white border shadow-lg rounded-2xl"><p className="text-sm font-medium text-slate-500">Resolved</p><p className="mt-1 text-3xl font-bold text-green-600">{stats.resolvedComplaints}</p></div>
          </div>
        )}

        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-800">My Complaints History</h2>
          <div className="space-y-4">
            {myComplaints.length > 0 ? myComplaints.map((complaint) => (
              <div key={complaint._id} className="flex flex-col items-start justify-between gap-4 p-5 bg-white border shadow-lg rounded-2xl sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={getStatusPill(complaint.status)}>{complaint.status.replace('_', ' ')}</span>
                    <p className="text-sm font-medium text-slate-400">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{complaint.title}</h3>
                  <p className="text-sm capitalize text-slate-500">Category: {complaint.category}</p>
                </div>
                {/* FIXED: Pass the entire complaint object */}
                <button onClick={() => handleViewDetails(complaint)} className="self-start mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 sm:self-center sm:mt-0">
                  View Details
                </button>
              </div>
            )) : (
              <div className="p-12 text-center bg-white border shadow-lg rounded-2xl text-slate-500">
                <p className="font-semibold">You haven't submitted any complaints yet.</p>
                <p className="mt-1 text-sm">Click the "Report New Issue" button to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UserComplaintModal
          complaint={selectedComplaint} // Pass the full object
          onClose={handleCloseModal}
          onComplaintUpdate={fetchData}
        />
      )}
    </>
  );
};

export default DashboardPage;