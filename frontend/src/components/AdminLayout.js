// src/components/AdminLayout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <AdminNavbar />
            <main className="p-4 sm:p-6 md:p-8 lg:p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;