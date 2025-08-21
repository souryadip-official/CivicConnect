// frontend/src/pages/CreateComplaintPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreateComplaintPage = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [severity, setSeverity] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    // --- NEW: State for the local image preview ---
    const [imagePreview, setImagePreview] = useState('');

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // --- NEW: Create a local URL for the preview ---
        setImagePreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImageUrl(data.imageUrl);
            setUploading(false);
        } catch (error) {
            console.error(error);
            alert('Image upload failed. Please try a different image or check your connection.');
            setUploading(false);
            setImagePreview(''); // Clear preview on error
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!imageUrl) {
            alert('Please wait for the image to finish uploading.');
            return;
        }
        try {
            const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('/api/complaints', { title, description, category, severity, location, imageUrl }, config);
            alert('Complaint submitted successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error.response.data);
            alert('Failed to submit complaint. Please ensure all fields are filled correctly.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-12 bg-gray-50 pt-28">
            <div className="w-full max-w-2xl p-10 bg-white shadow-lg rounded-xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Report a New Issue</h2>
                    <p className="text-gray-500">Please provide as much detail as possible.</p>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="title">Title</label>
                        <input className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" id="title" type="text" placeholder="e.g., Streetlight not working" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="description">Description</label>
                        <textarea className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" id="description" rows="5" placeholder="Describe the issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="image">Upload Image</label>
                        <input className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" id="image" type="file" onChange={uploadFileHandler} required />
                        {uploading && <p className="mt-2 text-sm text-gray-500">Uploading image, please wait...</p>}
                        {imageUrl && !uploading && <p className="mt-2 text-sm text-green-600">✓ Image uploaded successfully!</p>}
                    </div>

                    {/* --- NEW: Image Preview Section --- */}
                    {imagePreview && (
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Image Preview</label>
                            <img src={imagePreview} alt="Selected complaint" className="object-cover w-full h-64 border-2 rounded-lg border-slate-200" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="category">Category</label>
                            <select className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Select Category...</option>
                                <option value="roads">Roads</option>
                                <option value="sanitation">Sanitation</option>
                                <option value="electricity">Electricity</option>
                                <option value="water">Water</option>
                                <option value="public_safety">Public Safety</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="environment">Environment</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="severity">Severity</label>
                            <select className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" id="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} required>
                                <option value="">Select Severity...</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="location">Location</label>
                        <input className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" id="location" type="text" placeholder="e.g., Near the main market, Ward 5" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div>
                        <button className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400" type="submit" disabled={uploading}>
                            {uploading ? 'Waiting for upload...' : 'Submit Complaint'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateComplaintPage;