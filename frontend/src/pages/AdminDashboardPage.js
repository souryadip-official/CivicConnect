// src/pages/AdminDashboardPage.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import ComplaintDetailsModal from '../components/ComplaintDetailsModal';

const AdminDashboardPage = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (userInfo) {
                try {
                    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                    const [statsRes, complaintsRes] = await Promise.all([
                        axios.get('/api/complaints/admin/stats', config),
                        axios.get('/api/complaints/admin', config),
                    ]);
                    setStats(statsRes.data);
                    setComplaints(complaintsRes.data);
                } catch (error) {
                    if (error.response && error.response.status === 401) logout();
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [userInfo, logout]);

    const handleViewDetails = (complaint) => {
        setSelectedComplaint(complaint);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedComplaint(null);
    };

    const handleUpdateStatus = async (complaintId, newStatus) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data: updatedComplaint } = await axios.put(
                `/api/complaints/admin/${complaintId}/status`,
                { status: newStatus },
                config
            );
            setComplaints(complaints.map(c => c._id === complaintId ? updatedComplaint : c));
            const statsRes = await axios.get('/api/complaints/admin/stats', config);
            setStats(statsRes.data);
            alert('Status updated successfully!');
            handleCloseModal();
        } catch (error) {
            alert('Error updating status.');
        }
    };

    const getStatusClass = (status) => {
        if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
        if (status === 'in_progress') return 'bg-blue-100 text-blue-800';
        if (status === 'resolved') return 'bg-green-100 text-green-800';
        return 'bg-gray-100 text-gray-800';
    };

    if (loading) return <Loader />;

    return (
        <>
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl font-extrabold lg:text-4xl text-slate-800">Dashboard Overview</h1>
                    <p className="mt-2 text-base lg:text-lg text-slate-500">Manage and resolve community issues efficiently.</p>
                </div>

                {stats && (
                    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mb-12">
                        <div className="p-6 bg-white border shadow-lg rounded-2xl border-slate-200"><p className="text-sm font-medium text-slate-500">Total Residents</p><p className="mt-1 text-3xl font-bold text-slate-800">{stats.totalResidents}</p></div>
                        <div className="p-6 bg-white border shadow-lg rounded-2xl border-slate-200"><p className="text-sm font-medium text-slate-500">Total Complaints</p><p className="mt-1 text-3xl font-bold text-slate-800">{stats.totalComplaints}</p></div>
                        <div className="p-6 bg-white border shadow-lg rounded-2xl border-slate-200"><p className="text-sm font-medium text-slate-500">Pending</p><p className="mt-1 text-3xl font-bold text-yellow-600">{stats.pendingComplaints}</p></div>
                        <div className="p-6 bg-white border shadow-lg rounded-2xl border-slate-200"><p className="text-sm font-medium text-slate-500">Resolved</p><p className="mt-1 text-3xl font-bold text-green-600">{stats.resolvedComplaints}</p></div>
                    </div>
                )}

                <div className="overflow-hidden bg-white border shadow-lg rounded-2xl border-slate-200">
                    <div className="p-6 border-b border-slate-200"><h2 className="text-2xl font-bold text-slate-800">Manage Community Complaints</h2></div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-5 text-sm font-semibold uppercase text-slate-600">Complaint ID</th>
                                    <th className="p-5 text-sm font-semibold uppercase text-slate-600">Submitted By</th>
                                    <th className="p-5 text-sm font-semibold uppercase text-slate-600">Title</th>
                                    <th className="p-5 text-sm font-semibold uppercase text-slate-600">Status</th>
                                    <th className="p-5 text-sm font-semibold uppercase text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {complaints.length > 0 ? complaints.map((complaint) => (
                                    <tr key={complaint._id} className="hover:bg-slate-50">
                                        <td className="p-5 font-medium text-slate-700 whitespace-nowrap">...{complaint._id.slice(-6)}</td>
                                        <td className="p-5 text-slate-800 whitespace-nowrap">{complaint.postedBy?.name || 'N/A'}</td>
                                        <td className="p-5 text-slate-800">{complaint.title}</td>
                                        <td className="p-5"><span className={`px-3 py-1 text-sm font-bold rounded-full capitalize whitespace-nowrap ${getStatusClass(complaint.status)}`}>{complaint.status.replace('_', ' ')}</span></td>
                                        <td className="p-5"><button onClick={() => handleViewDetails(complaint)} className="font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap">View Details</button></td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="p-5 text-center text-slate-500">No complaints found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ComplaintDetailsModal
                    complaint={selectedComplaint}
                    onClose={handleCloseModal}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </>
    );
};

export default AdminDashboardPage;