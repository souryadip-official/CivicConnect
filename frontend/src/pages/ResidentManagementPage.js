// frontend/src/pages/ResidentManagementPage.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import ResidentDetailsModal from '../components/ResidentDetailsModal';

const ResidentManagementPage = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const [residents, setResidents] = useState([]);
    const [filteredResidents, setFilteredResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResidentId, setSelectedResidentId] = useState(null);

    const fetchResidents = React.useCallback(async () => {
        if (userInfo) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('/api/users/admin/residents', config);
                setResidents(data);
                setFilteredResidents(data);
            } catch (error) {
                if (error.response && error.response.status === 401) logout();
            } finally {
                setLoading(false);
            }
        }
    }, [userInfo, logout]);

    useEffect(() => {
        fetchResidents();
    }, [fetchResidents]);

    useEffect(() => {
        const results = residents.filter(resident =>
            resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.phone.includes(searchTerm) ||
            resident.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResidents(results);
    }, [searchTerm, residents]);

    const handleViewDetails = (residentId) => {
        setSelectedResidentId(residentId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedResidentId(null);
    };

    if (loading) return <Loader />;

    return (
        <>
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl font-extrabold lg:text-4xl text-slate-800">Resident Management</h1>
                    <p className="mt-2 text-base lg:text-lg text-slate-500">View, search, and manage all registered residents in your community.</p>
                </div>

                {/* --- Main Content Card --- */}
                <div className="bg-white border shadow-lg rounded-2xl border-slate-200">
                    {/* Header with Search */}
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-700">All Residents</h2>
                            <input
                                type="text"
                                placeholder="Search residents..."
                                className="w-full max-w-xs px-4 py-2 border rounded-lg shadow-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-5 text-sm font-semibold tracking-wider uppercase text-slate-600">Name</th>
                                    <th className="p-5 text-sm font-semibold tracking-wider uppercase text-slate-600">Email</th>
                                    <th className="p-5 text-sm font-semibold tracking-wider uppercase text-slate-600">Phone</th>
                                    <th className="p-5 text-sm font-semibold tracking-wider uppercase text-slate-600">Aadhaar</th>
                                    <th className="p-5 text-sm font-semibold tracking-wider text-right uppercase text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredResidents.length > 0 ? filteredResidents.map((resident, index) => (
                                    <tr key={resident._id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                        <td className="p-5 font-medium text-slate-800 whitespace-nowrap">{resident.name}</td>
                                        <td className="p-5 text-slate-600">{resident.email}</td>
                                        <td className="p-5 text-slate-600 whitespace-nowrap">{resident.phone}</td>
                                        <td className="p-5 text-slate-600 whitespace-nowrap">{resident.aadhaar}</td>
                                        <td className="p-5 text-right">
                                            <button 
                                                onClick={() => handleViewDetails(resident._id)} 
                                                className="font-semibold transition-colors text-emerald-600 hover:text-emerald-800 whitespace-nowrap"
                                            >
                                                View / Edit
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-slate-500">
                                            No residents found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ResidentDetailsModal
                    residentId={selectedResidentId}
                    onClose={handleCloseModal}
                    onUpdate={fetchResidents}
                />
            )}
        </>
    );
};

export default ResidentManagementPage;