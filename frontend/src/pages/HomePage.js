// frontend/src/pages/HomePage.js

import React from 'react';

// --- Reusable Component for Feature Cards ---
const FeatureCard = ({ icon, title, children }) => (
  <div className="relative p-8 transition-all duration-300 bg-white border-t-4 border-teal-500 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 group">
    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full shadow-lg bg-gradient-to-br from-teal-400 to-cyan-500 shadow-cyan-500/30">
      {icon}
    </div>
    <h3 className="mb-3 text-2xl font-bold text-gray-800">{title}</h3>
    <p className="leading-relaxed text-gray-600">{children}</p>
  </div>
);

// --- Reusable Component for "How It Works" Steps ---
const StepCard = ({ number, title, children }) => (
  <div className="relative pl-16">
    <div className="absolute top-0 left-0 flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-teal-500 rounded-full shadow-md shadow-teal-500/40">
      {number}
    </div>
    <h3 className="mb-2 text-2xl font-bold text-gray-800">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

// --- Reusable Component for Team Members ---
const TeamMember = ({ name, role, initials, color }) => (
    <div className="text-center group">
        <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-4xl font-bold ${color} transform group-hover:scale-110 transition-transform duration-300`}>
            {initials}
        </div>
        <h4 className="text-xl font-bold text-gray-800">{name}</h4>
        <p className="font-semibold text-teal-500">{role}</p>
    </div>
);


const HomePage = () => {
  const team = [
      { name: 'Souryadip Mallick', role: 'Team Lead, Full Stack Developer', initials: 'SM', color: 'bg-red-500' },
      { name: 'Kausik Das', role: 'Team Member, Full Stack Developer', initials: 'KD', color: 'bg-blue-500' },
      { name: 'Alisha Jaiswal', role: 'Team Member, Frontend Developer', initials: 'AJ', color: 'bg-purple-500' },
      { name: 'Nirmalya Maiti', role: 'Team Member, Frontend Developer', initials: 'NM', color: 'bg-green-500' },
  ];

  return (
    <div className="font-sans bg-slate-50">
      {/* --- CORRECTED: Hero Section --- */}
      <section className="w-full bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100">
        {/* This container ensures content respects the navbar height and has proper padding */}
        <div className="container flex items-center min-h-screen px-4 pt-24 pb-12 mx-auto sm:px-6 lg:px-8 lg:pt-20 lg:pb-0">
          <div className="flex flex-col items-center justify-center w-full gap-12 lg:flex-row">
            
            {/* Left Column: Text Content */}
            <div className="text-center lg:w-1/2 lg:text-left">
              <h2 className="text-xl font-bold tracking-wider text-teal-500 uppercase sm:text-2xl">
                Connecting Communities Digitally
              </h2>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-800 sm:text-5xl lg:text-7xl">
                Giving a Voice to <span className="text-teal-500">Every Village</span>
              </h1>
              <p className="max-w-xl mx-auto mt-6 text-base font-medium text-gray-600 lg:mx-0 sm:text-lg lg:text-xl">
                CivicConnect is the digital platform bridging the gap between residents and rural governance. Report issues, track complaints, and collaborate to build a transparent, efficient, and brighter future for your community.
              </p>
              <div className="mt-10">
                <a href="/register" className="px-8 py-3 text-base font-bold text-white transition-all duration-300 transform bg-teal-500 rounded-lg shadow-xl sm:px-10 sm:py-4 sm:text-lg shadow-teal-500/30 hover:scale-105 hover:bg-teal-600">
                  Get Started
                </a>
              </div>
            </div>

            {/* Right Column: Logo and Message */}
            <div className="flex justify-center lg:w-1/2">
              <div className="p-6 text-center transition-transform duration-500 transform shadow-2xl sm:p-8 bg-white/60 backdrop-blur-lg rounded-3xl hover:scale-105 ">
                  <img src="logo.png" alt="CivicConnect Logo" className="w-40 h-40 mx-auto border-4 border-black rounded-full shadow-lg sm:w-48 sm:h-48" />
                  <p className="mt-6 text-lg font-semibold text-gray-700 sm:text-xl">
                      Your bridge to a better community.
                  </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="py-20 bg-white lg:py-24">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">The Power of Digital Connection</h2>
            <p className="mt-4 text-lg text-gray-600">Features designed to empower citizens and streamline governance.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-3">
            <FeatureCard title="Direct Reporting" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}>
              Submit complaints with images and location details directly from your smartphone.
            </FeatureCard>
            <FeatureCard title="Real-Time Tracking" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}>
              Monitor the status of your complaints from 'Pending' to 'Resolved' with live updates.
            </FeatureCard>
            <FeatureCard title="Community Voice" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}>
              Upvote pressing issues to help officials prioritize the most critical needs of your community.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section id="how-it-works" className="py-20 lg:py-24 bg-slate-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">Change in Three Simple Steps</h2>
            <p className="mt-4 text-lg text-gray-600">Our process is designed for simplicity and impact.</p>
          </div>
          <div className="grid max-w-3xl grid-cols-1 gap-16 mx-auto">
            <StepCard number="1" title="Register & Describe">
              Create an account, select your rural body, and submit a detailed report of the issue with photos.
            </StepCard>
            <StepCard number="2" title="Track & Collaborate">
              Receive real-time notifications on your complaint's status and see what other issues are being reported.
            </StepCard>
            <StepCard number="3" title="Witness Resolution">
              Get notified when the issue is resolved and provide feedback to help improve the system.
            </StepCard>
          </div>
        </div>
      </section>

      {/* --- Meet The Team Section --- */}
      <section id="team" className="py-20 bg-white lg:py-24">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">The Minds Behind the Mission</h2>
            <p className="mt-4 text-lg text-gray-600">The QuadCore team dedicated to bridging the technology gap.</p>
          </div>
          <div className="grid max-w-4xl grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
                <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="py-20 bg-teal-500 lg:py-24">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Already a Member?</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-teal-100">
            Sign in to your dashboard to report a new issue or track the progress of your existing complaints.
          </p>
          <div className="mt-8">
            <a href="/login" className="px-8 py-3 text-base font-bold text-teal-600 transition-transform duration-300 transform bg-white rounded-lg shadow-xl sm:px-10 sm:py-4 sm:text-lg hover:scale-105">
              Login to Your Account
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;