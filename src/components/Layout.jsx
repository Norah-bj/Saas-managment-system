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
      <aside className="w-[234px] bg-[#09111e] flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-4 h-4 bg-white rounded-sm" />
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-white text-lg">
              Mother link
            </span>
          </div>

          <div className="flex flex-col items-center mb-8">
            <img
              className="w-[70px] h-[70px] rounded-full object-cover mb-3"
              alt="Profile"
              src="/ellipse-39.svg"
            />
            <div className="[font-family:'Poppins',Helvetica] font-semibold text-white text-base text-center">
              Welcome back
            </div>
            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-base text-center">
              Bonnie umurerwa
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-3 mb-2 rounded [font-family:'Poppins',Helvetica] font-semibold text-base ${
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

        <div className="p-4">
          <button className="w-full text-left px-4 py-3 [font-family:'Poppins',Helvetica] font-semibold text-white text-lg">
            Logout
          </button>
        </div>
      </aside>

      {children}
    </div>
  );
};
