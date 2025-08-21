// src/components/PageLoader.js

import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm z-[999]">
      <div className="relative flex flex-col items-center justify-center">
        {/* Ripple effect */}
        <div className="absolute w-32 h-32 border-4 border-green-400 rounded-full animate-ripple"></div>
        <div className="absolute delay-150 border-4 border-green-300 rounded-full w-44 h-44 animate-ripple"></div>
        <div className="absolute w-56 h-56 delay-300 border-4 border-green-200 rounded-full animate-ripple"></div>

        {/* Growing Tree */}
        <div className="relative flex flex-col items-center">
          {/* Stem */}
          <div className="w-2 h-10 bg-green-700 rounded-full animate-grow"></div>
          {/* Leaves */}
          <div className="absolute w-6 h-6 bg-green-500 rounded-full -top-3 -left-4 animate-bounce"></div>
          <div className="absolute w-8 h-8 delay-200 bg-green-600 rounded-full -top-6 animate-bounce"></div>
          <div className="absolute w-6 h-6 bg-green-500 rounded-full -top-3 -right-4 animate-bounce delay-400"></div>
        </div>

        {/* Text */}
        <span className="mt-20 text-xl font-bold tracking-wide text-green-700 animate-textpulse">
          Connecting Communities…
        </span>
      </div>
    </div>
  );
};

export default PageLoader;