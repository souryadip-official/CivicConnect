// frontend/src/pages/UserAnnouncementsPage.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from '../api';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';

const UserAnnouncementsPage = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnnouncements = useCallback(async () => {
        if (userInfo) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('/api/announcements', config);
                setAnnouncements(data);
            } catch (error) {
                if (error.response && error.response.status === 401) logout();
            } finally {
                setLoading(false);
            }
        }
    }, [userInfo, logout]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    if (loading) return <Loader />;

    return (
        <div className="container max-w-4xl mx-auto">
            <div className="mb-8 md:mb-12">
                <h1 className="text-3xl font-extrabold lg:text-4xl text-slate-800">Community Announcements</h1>
                <p className="mt-2 text-base lg:text-lg text-slate-500">Updates and notices from your local governing body.</p>
            </div>
            <div className="space-y-6">
                {announcements.length > 0 ? announcements.map(ann => (
                    <div key={ann._id} className="p-6 bg-white border shadow-lg rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold text-slate-800">{ann.title}</h2>
                            <p className="text-sm text-slate-500">{new Date(ann.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="leading-relaxed text-slate-700">{ann.content}</p>
                        <p className="pt-4 mt-4 text-sm border-t text-slate-500">Posted by: <span className="font-semibold">{ann.postedBy?.name || 'Admin'}</span></p>
                    </div>
                )) : (
                    <div className="p-12 text-center bg-white border shadow-lg rounded-2xl">
                        <p className="text-slate-500">There are no announcements from your governing body at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAnnouncementsPage;