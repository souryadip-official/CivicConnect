// src/components/UserComplaintModal.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const UserComplaintModal = ({ complaint, onClose, onComplaintUpdate }) => {
    const { userInfo } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', location: '', imageUrl: '' });
    const [uploading, setUploading] = useState(false);
    
    // --- NEW: State for delete confirmation ---
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (complaint) {
            setFormData({
                title: complaint.title,
                description: complaint.description,
                location: complaint.location,
                imageUrl: complaint.imageUrl
            });
        }
    }, [complaint]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post('/api/upload', uploadFormData, config);
            setFormData({ ...formData, imageUrl: data.imageUrl });
        } catch (error) {
            alert('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`/api/complaints/${complaint._id}`, formData, config);
            alert('Complaint updated successfully!');
            onComplaintUpdate();
            onClose();
        } catch (error) {
            alert('Error updating complaint. Please try again.');
        }
    };

    // --- NEW: Function to handle the final deletion ---
    const handleDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`/api/complaints/${complaint._id}`, config);
            alert('Complaint deleted successfully!');
            onComplaintUpdate();
            onClose();
        } catch (error) {
            alert('Error deleting complaint. Please try again.');
        }
    };

    const isOwner = complaint && userInfo && complaint.postedBy.toString() === userInfo._id.toString();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">Complaint Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8 p-6 overflow-y-auto md:grid-cols-2">
                    {/* ... (Image and Details sections are unchanged) ... */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500">Image</label>
                        <img src={formData.imageUrl} alt="Complaint" className="object-cover w-full h-64 border-2 rounded-lg" />
                        {editMode && (
                            <div>
                                <input type="file" id="image-upload" className="hidden" onChange={handleFileChange} />
                                <label htmlFor="image-upload" className="block w-full px-4 py-2 mt-2 text-sm font-semibold text-center text-indigo-700 bg-indigo-100 rounded-lg cursor-pointer hover:bg-indigo-200">
                                    {uploading ? 'Uploading...' : 'Change Image'}
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-500">Title</label>
                            {editMode ? <input id="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 text-lg font-semibold border rounded-md text-slate-800 bg-slate-100"/> : <p className="text-lg font-semibold text-slate-800">{complaint.title}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-500">Description</label>
                            {editMode ? <textarea id="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded-md text-slate-800 bg-slate-100" rows="4"/> : <p className="text-slate-800">{complaint.description}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-500">Location</label>
                            {editMode ? <input id="location" value={formData.location} onChange={handleInputChange} className="w-full p-2 border rounded-md text-slate-800 bg-slate-100"/> : <p className="text-slate-800">{complaint.location}</p>}
                        </div>
                    </div>
                </div>

                {/* --- UPDATED: Footer with Delete Button --- */}
                <div className="flex items-center justify-between gap-4 p-6 border-t bg-slate-50 border-slate-200">
                    {/* Left side: Delete button and confirmation */}
                    <div>
                        {isOwner && complaint.status === 'pending' && !editMode && !showDeleteConfirm && (
                            <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-2 font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
                                Delete
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
                        {isOwner && complaint.status === 'pending' && !editMode && (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-6 py-2 font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200"
                            >
                                Edit
                            </button>
                        )}
                        {editMode && (
                            <>
                                <button onClick={() => setEditMode(false)} className="px-6 py-2 font-semibold rounded-lg text-slate-700 bg-slate-200 hover:bg-slate-300">Cancel</button>
                                <button onClick={handleSaveChanges} className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700" disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Save Changes'}
                                </button>
                            </>
                        )}
                        <button onClick={onClose} className="px-6 py-2 font-semibold rounded-lg text-slate-700 bg-slate-200 hover:bg-slate-300">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComplaintModal;