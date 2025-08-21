// src/components/ResidentDetailsModal.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';
import { X } from "lucide-react";

const ResidentDetailsModal = ({ residentId, onClose, onUpdate }) => {
    const { userInfo } = useContext(AuthContext);
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    
    // --- NEW: State for delete confirmation ---
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchResident = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`/api/users/admin/residents/${residentId}`, config);
                setResident(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    occupation: data.occupation,
                    maritalStatus: data.maritalStatus,
                    address: data.address
                });
            } catch (error) {
                alert('Could not load resident details.');
                onClose();
            } finally {
                setLoading(false);
            }
        };
        fetchResident();
    }, [residentId, userInfo.token, onClose]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`/api/users/admin/residents/${residentId}`, formData, config);
            alert('Resident details updated successfully!');
            onUpdate();
            onClose();
        } catch (error) {
            alert('Failed to update resident details.');
        }
    };

    // --- NEW: Function to handle the final deletion ---
    const handleDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`/api/users/admin/residents/${residentId}`, config);
            alert('Resident deleted successfully!');
            onUpdate();
            onClose();
        } catch (error) {
            alert('Error deleting resident. Please try again.');
        }
    };

    const DetailItem = ({ label, value, isEditing = false, children }) => (
        <div>
            <label className="text-sm font-semibold text-slate-500">{label}</label>
            {isEditing ? children : <p className="mt-1 text-lg font-medium text-slate-800">{value || 'N/A'}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-slate-800">Resident Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100"><X size={22} strokeWidth={2.5} /></button>
                </div>

                {loading ? <div className="flex items-center justify-center flex-1 p-8"><Loader /></div> : (
                    <>
                        <div className="p-8 space-y-6 overflow-y-auto">
                            {/* ... (DetailItem grid remains the same) ... */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <DetailItem label="Full Name" value={resident.name} isEditing={editMode}>
                                    <input id="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md bg-slate-100"/>
                                </DetailItem>
                                <DetailItem label="Email Address" value={resident.email} isEditing={editMode}>
                                    <input id="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md bg-slate-100"/>
                                </DetailItem>
                                <DetailItem label="Phone Number" value={resident.phone} isEditing={editMode}>
                                    <input id="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md bg-slate-100"/>
                                </DetailItem>
                                <DetailItem label="Occupation" value={resident.occupation} isEditing={editMode}>
                                    <input id="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md bg-slate-100"/>
                                </DetailItem>
                                <DetailItem label="Marital Status" value={resident.maritalStatus} isEditing={editMode}>
                                    <select id="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md bg-slate-100">
                                        <option>Single</option>
                                        <option>Married</option>
                                        <option>Divorced</option>
                                        <option>Widowed</option>
                                    </select>
                                </DetailItem>
                                <DetailItem label="Aadhaar Number" value={resident.aadhaar} />
                                <div className="sm:col-span-2">
                                    <DetailItem label="Full Address" value={resident.address} isEditing={editMode}>
                                        <textarea id="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md bg-slate-100" rows="3"></textarea>
                                    </DetailItem>
                                </div>
                            </div>
                        </div>

                        {/* --- UPDATED: Footer with Delete Button --- */}
                        <div className="flex items-center justify-between gap-4 p-6 border-t bg-slate-50">
                            {/* Left side: Delete button and confirmation */}
                            <div>
                                {!editMode && !showDeleteConfirm && (
                                    <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-2 font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
                                        Delete Resident
                                    </button>
                                )}
                                {showDeleteConfirm && (
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm font-semibold text-slate-700">Are you sure?</p>
                                        <button onClick={handleDelete} className="font-bold text-red-600 hover:underline">Yes, Delete</button>
                                        <button onClick={() => setShowDeleteConfirm(false)} className="font-bold text-slate-500 hover:underline">No</button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Right side: Edit/Save/Close buttons */}
                            <div className="flex justify-end gap-4">
                                {editMode ? (
                                    <>
                                        <button onClick={() => setEditMode(false)} className="px-6 py-2 font-semibold rounded-lg text-slate-700 bg-slate-200">Cancel</button>
                                        <button onClick={handleSaveChanges} className="px-6 py-2 font-semibold text-white rounded-lg bg-emerald-600">Save Changes</button>
                                    </>
                                ) : (
                                    <button onClick={() => setEditMode(true)} className="px-6 py-2 font-semibold text-white rounded-lg bg-emerald-600">Edit</button>
                                )}
                                <button onClick={onClose} className="px-6 py-2 font-semibold rounded-lg text-slate-700 bg-slate-200">Close</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResidentDetailsModal;