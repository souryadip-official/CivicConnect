// frontend/src/pages/CommunityBoardPage.js

import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from '../api';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { 
    FaRoad, FaTint, FaBolt, FaToilet, FaShieldAlt, 
    FaHospital, FaBook, FaLeaf, FaEllipsisH, FaCity 
} from "react-icons/fa";

// --- Icon Components ---
const UpvoteIcon = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
  </svg>
);

const DownvoteIcon = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);

// Map category -> icon
const categoryIcons = {
  roads: <FaRoad />,
  sanitation: <FaToilet />,
  electricity: <FaBolt />,
  water: <FaTint />,
  public_safety: <FaShieldAlt />,
  healthcare: <FaHospital />,
  education: <FaBook />,
  environment: <FaLeaf />,
  others: <FaEllipsisH />,
};

const CommunityBoardPage = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    'all','roads','sanitation','electricity','water',
    'public_safety','healthcare','education','environment','others'
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      if (userInfo) {
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get('/api/complaints/community', config);
          setComplaints(data);
        } catch (error) {
          if (error.response && error.response.status === 401) logout();
        } finally {
          setLoading(false);
        }
      }
    };
    fetchComplaints();
  }, [userInfo, logout]);

  const handleVote = async (complaintId, voteType) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data: updatedComplaint } = await axios.put(`/api/complaints/${complaintId}/vote`, { voteType }, config);
      setComplaints(complaints.map(c => c._id === complaintId ? updatedComplaint : c));
    } catch (error) {
      alert('Failed to cast vote. Please try again.');
    }
  };

  const filteredAndSortedComplaints = useMemo(() => {
    let result = [...complaints];
    if (filterCategory !== 'all') {
      result = result.filter(c => c.category === filterCategory);
    }
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'mostVoted') {
      result.sort((a, b) => {
        const voteA = a.votes.reduce((acc, vote) => acc + (vote.voteType === 'upvote' ? 1 : -1), 0);
        const voteB = b.votes.reduce((acc, vote) => acc + (vote.voteType === 'upvote' ? 1 : -1), 0);
        return voteB - voteA;
      });
    }
    return result;
  }, [complaints, filterCategory, sortBy]);

  const getStatusPill = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'in_progress') return 'bg-blue-100 text-blue-800';
    if (status === 'resolved') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-2 text-4xl font-extrabold text-slate-800">
            🌾Community Issues Board
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Raise your voice, vote, and track issues that matter to your neighborhood.
          </p>
        </div>

        {/* FILTER + SORT */}
        <div className="flex flex-col gap-4 p-4 mb-8 bg-white border shadow-lg sm:flex-row rounded-2xl border-slate-200">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-bold text-slate-600">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilterCategory(cat)} 
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors 
                    ${filterCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {categoryIcons[cat] || <FaEllipsisH />} {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_',' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 sm:max-w-xs">
            <label className="block mb-2 text-sm font-bold text-slate-600">Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Most Recent</option>
              <option value="mostVoted">Most Voted</option>
            </select>
          </div>
        </div>

        {/* COMPLAINTS GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedComplaints.length > 0 ? filteredAndSortedComplaints.map(complaint => {
            const upvotes = complaint.votes.filter(v => v.voteType === 'upvote').length;
            const downvotes = complaint.votes.filter(v => v.voteType === 'downvote').length;
            const totalVotes = upvotes + downvotes;
            const upvotePercentage = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 50;
            const userVote = complaint.votes.find(v => v.userId === userInfo._id)?.voteType;
            const initials = (complaint.postedBy?.name || 'A').split(' ').map(n => n[0]).join('');

            return (
              <div key={complaint._id} className="flex flex-col transition-all duration-300 bg-white border shadow-lg rounded-2xl border-slate-200 hover:shadow-2xl hover:-translate-y-1">
                <img src={complaint.imageUrl} alt={complaint.title} className="object-cover w-full h-48 rounded-t-2xl" />
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${getStatusPill(complaint.status)}`}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-slate-200 text-slate-600">{initials}</div>
                      <span className="text-sm font-semibold text-slate-700">{complaint.postedBy?.name || 'A resident'}</span>
                    </div>
                  </div>
                  <h3 className="flex-1 mt-4 text-xl font-bold text-slate-800">{complaint.title}</h3>
                  <p className="flex items-center gap-2 mt-2 text-sm capitalize text-slate-500">
                    {categoryIcons[complaint.category] || <FaEllipsisH />} {complaint.category}
                  </p>
                </div>
                <div className="p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <button 
                      onClick={() => handleVote(complaint._id, 'upvote')} 
                      className={`flex items-center gap-1 font-bold transition-colors text-sm ${userVote === 'upvote' ? 'text-green-600' : 'text-slate-500 hover:text-green-600'}`}
                    >
                      <UpvoteIcon filled={userVote === 'upvote'} /> {upvotes}
                    </button>
                    <button 
                      onClick={() => handleVote(complaint._id, 'downvote')} 
                      className={`flex items-center gap-1 font-bold transition-colors text-sm ${userVote === 'downvote' ? 'text-red-600' : 'text-slate-500 hover:text-red-600'}`}
                    >
                      <DownvoteIcon filled={userVote === 'downvote'} /> {downvotes}
                    </button>
                  </div>
                  <div className="w-full h-2 bg-red-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${upvotePercentage}%` }}></div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="p-12 text-center bg-white border shadow-md col-span-full rounded-2xl">
              <h3 className="text-xl font-bold text-slate-700">No Complaints Found</h3>
              <p className="mt-2 text-slate-500">Try adjusting your filters or be the first to report an issue in your community! 🌟</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityBoardPage;
