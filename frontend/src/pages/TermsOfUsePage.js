// src/pages/TermsOfUsePage.js

import React from 'react';

const TermsOfUsePage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container max-w-4xl px-6 mx-auto">
                <div className="p-8 bg-white border shadow-lg sm:p-12 rounded-2xl border-slate-200">
                    <h1 className="mb-6 text-3xl font-extrabold md:text-4xl text-slate-800">Terms of Use</h1>
                    <div className="space-y-6 leading-relaxed text-slate-600">
                        <p><strong>Last Updated:</strong> August 21, 2025</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">1. Agreement to Terms</h2>
                        <p>By using the CivicConnect platform, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the platform.</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">2. User Conduct</h2>
                        <p>You agree to use the platform only for lawful purposes. You are prohibited from posting on or transmitting through the platform any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, fraudulent, racially, ethnically, or otherwise objectionable material of any kind.</p>
                        <p>You agree not to submit false or misleading information, including false complaints or personal data. Misuse of the platform may result in suspension or termination of your account.</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">3. Intellectual Property</h2>
                        <p>The content on the platform, including text, graphics, logos, and images, is the property of CivicConnect or its content suppliers and is protected by copyright and other intellectual property laws.</p>

                        <h2 className="pt-4 mt-6 text-2xl font-bold border-t text-slate-700">4. Disclaimer of Warranties</h2>
                        <p>The platform is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUsePage;