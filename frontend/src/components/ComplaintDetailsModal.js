// src/components/ComplaintDetailsModal.js

import React, { useState } from 'react';

const ComplaintDetailsModal = ({ complaint, onClose, onUpdateStatus }) => {
  // State to manage the selected status in the dropdown
  const [newStatus, setNewStatus] = useState(complaint.status);

  if (!complaint) {
    return null;
  }

  const handleSaveChanges = () => {
    // Call the update function passed down from the dashboard page
    onUpdateStatus(complaint._id, newStatus);
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Complaint Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-500">Complaint ID</h3>
              <p className="font-medium text-slate-800">...{complaint._id.slice(-6)}</p>

              <h3 className="mt-4 mb-1 text-sm font-semibold text-slate-500">Submitted By</h3>
              <p className="font-medium text-slate-800">{complaint.postedBy?.name || 'N/A'}</p>

              <h3 className="mt-4 mb-1 text-sm font-semibold text-slate-500">Category</h3>
              <p className="font-medium capitalize text-slate-800">{complaint.category}</p>

              <h3 className="mt-4 mb-1 text-sm font-semibold text-slate-500">Severity</h3>
              <p className="font-medium capitalize text-slate-800">{complaint.severity}</p>

              <h3 className="mt-4 mb-1 text-sm font-semibold text-slate-500">Location</h3>
              <p className="font-medium text-slate-800">{complaint.location}</p>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-500">Description</h3>
              <p className="p-4 border rounded-lg text-slate-700 bg-slate-50 border-slate-200">{complaint.description}</p>
              
              <h3 className="mt-4 mb-1 text-sm font-semibold text-slate-500">Image</h3>
              <img src={complaint.imageUrl} alt="Complaint" className="w-full border rounded-lg border-slate-200" />
            </div>
          </div>
        </div>

        {/* Footer with Status Update */}
        <div className="flex flex-col items-center justify-between gap-4 p-6 border-t bg-slate-50 border-slate-200 sm:flex-row">
          <div>
            <label htmlFor="status" className="mr-2 font-semibold text-slate-600">Update Status:</label>
            <select
              id="status"
              className="px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <button
            onClick={handleSaveChanges}
            className="w-full px-6 py-2 font-bold text-white transition-colors rounded-lg sm:w-auto bg-emerald-600 hover:bg-emerald-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;