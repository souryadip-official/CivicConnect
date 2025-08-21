// src/components/UserLayout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const UserLayout = () => {
    return (
        <div className="min-h-screen font-sans bg-slate-100">
            <UserNavbar />
            <main className="p-4 sm:p-6 md:p-8 lg:p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;