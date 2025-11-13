import React from "react";

export const AuthBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[280px] h-[280px] bg-[#0b1739] rounded-full opacity-30" />
        <div className="absolute top-1/3 -right-32 w-[340px] h-[340px] bg-gradient-to-br from-[#0b1739] to-[#1a2d5a] rounded-full opacity-40" />
        <div className="absolute bottom-0 left-1/3 translate-y-1/2 w-[220px] h-[220px] bg-[#1a2d5a] rounded-full opacity-20" />
        <div className="absolute -bottom-24 -left-16 w-[260px] h-[260px] bg-gradient-to-tr from-[#0b1739] to-[#1a2d5a] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

