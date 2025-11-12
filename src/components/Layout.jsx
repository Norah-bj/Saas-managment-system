import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  { label: "Dashboard", icon: "/vector-1.svg", path: "/" },
  { label: "User management", icon: "/vector-19.svg", path: "/user-management" },
  { label: "CHW management", icon: "/vector-19.svg", path: "/chw-management" },
  { label: "Emergency & Alerts", icon: "/Vector-18.svg", path: "/emergency-alerts" },
  { label: "Ambulance tracker", icon: "/vector-4.svg", path: "/ambulance-tracker" },
  { label: "Appointments", icon: "/vector-1.svg", path: "/appointments" },
  { label: "Data analytics", icon: "/vector-20.svg", path: "/reports-analytics" },
  { label: "settings", icon: "/vector-2.svg", path: "/settings" },
];

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-[220px] h-screen bg-[#09111e] flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center gap-5 mb-4">
            <img
              src="/mother_logo.svg"
              alt="Mother link logo"
              className="w-[35px] h-[35px]"
            />
            <span className="[font-family:'Poppins',Helvetica] font-semibold text-white text-sm">
              Mother link
            </span>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center mb-2">
            <img
              className="w-[100px] h-[100px] rounded-full object-cover mb-2"
              alt="Profile"
              src="/Profile.png"
            />
            <div className="[font-family:'Poppins',Helvetica] font-semibold text-white text-sm text-center">
              Welcome back
            </div>
            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-xs text-center">
              Bonnie umurerwa
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-3 py-3 mb-1 rounded flex items-center gap-2 [font-family:'Poppins',Helvetica] font-semibold text-sm transition ${
                  isActive
                    ? "bg-white text-[#09111e]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-[16px] h-[16px] ${isActive ? "brightness-0" : "invert"}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 mt-auto">
          <button className="w-full text-left px-3 py-2 [font-family:'Poppins',Helvetica] font-semibold text-white text-sm flex items-center gap-2 hover:bg-white/10 transition">
            <img src="/logout.svg" alt="Logout" className="w-[16px] h-[16px] invert" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-[220px] p-6">{children}</main>
    </div>
  );
};