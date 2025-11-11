import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  { label: "Dashboard", path: "/", active: false },
  { label: "User management", path: "/user-management", active: false },
  { label: "CHW management", path: "/chw-management", active: false },
  { label: "Emergency & Alerts", path: "/emergency-alerts", active: false },
  { label: "Ambulance tracker", path: "/ambulance-tracker", active: false },
  { label: "Appointments", path: "/appointments", active: false },
  { label: "Data analytics", path: "/reports-analytics", active: false },
  { label: "settings", path: "/settings", active: false },
];

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <aside className="w-[234px] bg-[#09111e] flex flex-col fixed h-screen">
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-3 justify-center mb-6">
            <div className="w-3 h-3 bg-white rounded-sm" />
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-white text-base text-center">
              Mother link
            </span>
          </div>
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-[60px] h-[60px] rounded-full object-cover mb-1.5"
              alt="Profile"
              src="/ellipse-39.svg"
            />
            <div className="[font-family:'Poppins',Helvetica] font-semibold text-white text-sm text-center">
              Welcome back
            </div>
            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm text-center">
              Bonnie umurerwa
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 overflow-y-hidden">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-3 py-2.5 mb-1.5 rounded [font-family:'Poppins',Helvetica] font-semibold text-base ${
                  isActive
                    ? "bg-white text-[#09111e]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3">
          <button className="w-full text-left px-3 py-1.5 [font-family:'Poppins',Helvetica] font-semibold text-white text-base">
            Logout
          </button>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 ml-[234px] p-6">{children}</main>
    </div>
  );
};