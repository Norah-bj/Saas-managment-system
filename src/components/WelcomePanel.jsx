import React from "react";
import { Button } from "./Button";

export const WelcomePanel = ({ className = "" }) => {
  return (
    <div
      className={`relative w-full h-full min-h-[520px] bg-[#0b1739] rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 shadow-2xl ${className}`}
    >
      {/* Abstract shapes background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#1a2d5a] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#1a2d5a] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#1a2d5a] rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-md">
        <h2 className="[font-family:'Poppins',Helvetica] font-bold text-white text-3xl mb-4">
          Welcome to Mother Link!
        </h2>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-base mb-8 opacity-90">
          An ai-powered health platform for mothers and children
        </p>
        <Button className="bg-[#001240] text-white hover:bg-[#001240]/90 px-6 py-2 rounded-lg [font-family:'Poppins',Helvetica] font-medium">
          Get started
        </Button>
      </div>
    </div>
  );
};

