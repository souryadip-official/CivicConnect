// src/pages/ContactSupportPage.js

import React from 'react';

const ContactSupportPage = () => {
    return (
        <div className="flex items-center min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container max-w-2xl px-6 mx-auto">
                <div className="p-8 text-center bg-white border shadow-lg sm:p-12 rounded-2xl border-slate-200">
                    <h1 className="mb-4 text-3xl font-extrabold md:text-4xl text-slate-800">Contact Support</h1>
                    <p className="mb-8 text-lg text-slate-600">
                        For any technical issues, questions, or feedback regarding the CivicConnect platform, please reach out to our support team.
                    </p>
                    
                    <div className="p-6 border rounded-lg bg-slate-50 border-slate-200">
                        <p className="font-semibold text-slate-700">You can email us directly at:</p>
                        <a 
                            href="mailto:civicconnect365@gmail.com" 
                            className="text-xl font-bold text-teal-500 break-words hover:text-teal-600 hover:underline"
                        >
                            civicconnect365@gmail.com
                        </a>
                        <p className="mt-4 text-sm text-slate-500">
                            Clicking the email address will open your default mail client. We aim to respond within 24-48 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSupportPage;