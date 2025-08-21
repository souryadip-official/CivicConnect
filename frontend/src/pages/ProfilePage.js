// frontend/src/pages/ProfilePage.js

import React, { useState, useEffect, useContext } from 'react';
import axios from '../api';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';

const ProfilePage = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    // This effect fetches the initial profile data ONCE
    useEffect(() => {
        const fetchProfile = async () => {
            if (userInfo) {
                try {
                    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                    const { data } = await axios.get('/api/users/profile', config);
                    setProfileData(data);
                } catch (error) {
                    if (error.response && error.response.status === 401) logout();
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProfile();
    }, [userInfo, logout]);

    // This function is called when the user clicks the "Edit" button
    const handleEditClick = () => {
        // Populate the form with the current profile data
        setFormData({
            email: profileData.email || '',
            occupation: profileData.occupation || '',
            maritalStatus: profileData.maritalStatus || 'Single',
            address: profileData.address || '',
            voterId: profileData.voterId || ''
        });
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.put('/api/users/profile', formData, config);
            
            // Update the main profile data with the complete response from the server
            setProfileData(data);
            
            alert('Profile updated successfully!');
            setEditMode(false);
        } catch (error) {
            alert('Error updating profile. Please try again.');
        }
    };
    
    const handleCancel = () => {
        setEditMode(false);
        // No need to reset formData, it will be repopulated on the next edit click
    };

    if (loading) return <Loader />;
    if (!profileData) return <div className="p-10 text-center">Could not load profile data.</div>;

    const initials = profileData.name.split(' ').map(n => n[0]).join('');
    
    const DetailItem = ({ label, children }) => (
        <div>
            <label className="text-sm font-semibold text-slate-500">{label}</label>
            <div className="mt-1">{children}</div>
        </div>
    );

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center md:mb-12">
                <div>
                    <h1 className="text-3xl font-extrabold lg:text-4xl text-slate-800">My Profile</h1>
                    <p className="mt-2 text-base lg:text-lg text-slate-500">
                        {editMode ? "You can now edit your information." : "View your personal information."}
                    </p>
                </div>
                <div className="flex gap-4">
                    {editMode ? (
                        <>
                            <button onClick={handleCancel} className="px-6 py-2 font-semibold rounded-lg text-slate-700 bg-slate-200 hover:bg-slate-300">Cancel</button>
                            <button onClick={handleSaveChanges} className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Save Changes</button>
                        </>
                    ) : (
                        <button onClick={handleEditClick} className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Edit Profile</button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="p-8 text-center bg-white border shadow-lg rounded-2xl">
                        <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 text-5xl font-bold text-white bg-indigo-600 rounded-full">{initials}</div>
                        <h2 className="text-2xl font-bold text-slate-800">{profileData.name}</h2>
                        {editMode ? (
                           <input id="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 mt-1 text-lg font-medium text-center border rounded-md text-slate-800 bg-slate-100"/>
                        ) : (
                           <p className="text-slate-500">{profileData.email}</p>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="p-8 bg-white border shadow-lg rounded-2xl">
                        <div className="space-y-6">
                            <div>
                                <h3 className="pb-4 mb-6 text-xl font-bold border-b text-slate-800">Personal Information</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <DetailItem label="Phone"><p className="text-lg font-medium text-slate-800">{profileData.phone}</p></DetailItem>
                                    <DetailItem label="Date of Birth"><p className="text-lg font-medium text-slate-800">{new Date(profileData.dob).toLocaleDateString()}</p></DetailItem>
                                    <DetailItem label="Gender"><p className="text-lg font-medium text-slate-800">{profileData.gender}</p></DetailItem>
                                    <DetailItem label="Occupation">
                                        {editMode ? <input id="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full p-2 text-lg font-medium border rounded-md text-slate-800 bg-slate-100"/> : <p className="text-lg font-medium text-slate-800">{profileData.occupation}</p>}
                                    </DetailItem>
                                    <DetailItem label="Marital Status">
                                        {editMode ? (
                                            <div className="relative">
                                                <select id="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full p-2 text-lg font-medium border rounded-md appearance-none text-slate-800 bg-slate-100">
                                                    <option>Single</option>
                                                    <option>Married</option>
                                                    <option>Divorced</option>
                                                    <option>Widowed</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-700"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                                            </div>
                                        ) : <p className="text-lg font-medium text-slate-800">{profileData.maritalStatus}</p>}
                                    </DetailItem>
                                </div>
                            </div>
                            <div>
                                <h3 className="pb-4 my-6 text-xl font-bold border-b text-slate-800">Address & Documents</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <DetailItem label="Aadhaar"><p className="text-lg font-medium text-slate-800">{profileData.aadhaar}</p></DetailItem>
                                    <DetailItem label="Voter ID">
                                        {editMode && !profileData.voterId ? (
                                            <input id="voterId" value={formData.voterId} onChange={handleInputChange} className="w-full p-2 text-lg font-medium border rounded-md text-slate-800 bg-slate-100" placeholder="Enter Voter ID"/>
                                        ) : <p className="text-lg font-medium text-slate-800">{profileData.voterId || 'Not Provided'}</p>}
                                    </DetailItem>
                                    <div className="sm:col-span-2">
                                        <DetailItem label="Full Address">
                                            {editMode ? <textarea id="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 text-lg font-medium border rounded-md text-slate-800 bg-slate-100" rows="2"/> : <p className="text-lg font-medium text-slate-800">{profileData.address}</p>}
                                        </DetailItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;