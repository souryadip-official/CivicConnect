// src/pages/PrivacyPolicyPage.js

import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container max-w-4xl px-6 mx-auto">
                <div className="p-8 bg-white border shadow-lg sm:p-12 rounded-2xl border-slate-200">
                    <h1 className="mb-6 text-3xl font-extrabold md:text-4xl text-slate-800">Privacy Policy</h1>
                    <div className="space-y-6 leading-relaxed text-slate-600">
                        <p><strong>Last Updated:</strong> August 21, 2025</p>
                        
                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">1. Introduction</h2>
                        <p>Welcome to CivicConnect ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">2. Information We Collect</h2>
                        <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform, or otherwise when you contact us.</p>
                        <p>The personal information that we collect depends on the context of your interactions with us and the platform, the choices you make, and the products and features you use. The personal information we collect may include: Name, Phone Number, Email Address, Mailing Address, Aadhaar Number, Voter ID, and other similar data.</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">3. How We Use Your Information</h2>
                        <p>We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                        
                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">4. Will Your Information Be Shared?</h2>
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. Your data is shared with the respective rural governing body (Gram Panchayat) you register under to facilitate complaint resolution.</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">5. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at <a href="mailto:civicconnect365@gmail.com" className="font-semibold text-teal-500 hover:underline">civicconnect365@gmail.com</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;