// frontend/src/pages/AdminAnnouncementsPage.js
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import { Megaphone, Trash2, PlusCircle, FileText } from "lucide-react";

const AdminAnnouncementsPage = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchAnnouncements = useCallback(async () => {
    if (userInfo) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get("/api/announcements/admin", config);
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post("/api/announcements", { title, content }, config);
      setTitle("");
      setContent("");
      fetchAnnouncements();
    } catch (error) {
      alert("Failed to publish announcement.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/announcements/${id}`, config);
        fetchAnnouncements();
      } catch (error) {
        alert("Failed to delete announcement.");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-700">
          <Megaphone size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Manage Announcements
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage communications for your community.
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* New Announcement Form */}
        <div className="lg:col-span-1">
          <div className="p-6 border shadow-md bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl">
            <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-emerald-700">
              <PlusCircle className="text-emerald-600" /> New Announcement
            </h2>
            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-slate-600"
                >
                  Title
                </label>
                <div className="flex items-center mt-1 bg-white border rounded-md shadow-sm border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500">
                  <FileText className="ml-3 text-slate-400" size={18} />
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter announcement title"
                    className="w-full p-2 pl-3 border-0 rounded-md focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-slate-600"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows="5"
                  placeholder="Write your announcement details here..."
                  className="w-full p-3 mt-1 border rounded-lg shadow-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition rounded-lg shadow-md bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
              >
                Publish Announcement
              </button>
            </form>
          </div>
        </div>

        {/* Announcements List */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white border shadow-md rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              Published Announcements
            </h2>
            <div className="space-y-5">
              {announcements.length > 0 ? (
                announcements.map((ann) => (
                  <div
                    key={ann._id}
                    className="p-5 transition border shadow-sm rounded-xl border-slate-200 bg-gradient-to-br from-slate-50 to-white hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                          <Megaphone className="text-emerald-600" size={18} />
                          {ann.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Posted on{" "}
                          {new Date(ann.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(ann._id)}
                        className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                    <p className="mt-3 leading-relaxed text-slate-700">
                      {ann.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-8 font-semibold text-center text-slate-500">
                  No announcements published yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncementsPage;
