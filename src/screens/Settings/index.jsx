import React, { useState } from "react";
import { GeneralInformation } from "./GeneralInformation";
import { UsersRoles } from "./UsersRoles";
import { Notifications } from "./Notifications";
import { Security } from "./Security";
import { Appearance } from "./Appearance";
import {
  Settings as SettingsIcon,
  Users,
  Bell,
  Lock,
  Eye,
  BellIcon,
  MenuIcon,
  SearchIcon,
  Save,
  RotateCcw,
} from "lucide-react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const settingsMenuItems = [
  { id: "general", label: "General information", icon: SettingsIcon },
  { id: "users", label: "User & Roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Eye },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralInformation />;
      case "users":
        return <UsersRoles />;
      case "notifications":
        return <Notifications />;
      case "security":
        return <Security />;
      case "appearance":
        return <Appearance />;
      default:
        return <GeneralInformation />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-[76px] border-b flex items-center justify-between px-8">
        <div className="flex items-center gap-4 flex-1 max-w-[522px]">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="search anything..."
              className="pl-10 [font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]"
            />
          </div>
          <Button className="h-[38px] bg-[#001240] rounded-[0px_5px_5px_0px]">
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-xl mb-1">
              Profile settings
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
              Manage system rules, roles, and configurations across hospitals and CHWs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-auto px-4 py-2 rounded-[3px] border border-[#0000004c]"
            >
              <Save className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-sm">
                Save changes
              </span>
            </Button>
            <Button className="h-auto px-4 py-2 rounded-[3px] bg-[#001240] text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              <span className="[font-family:'Poppins',Helvetica] font-medium text-sm">
                Restore default
              </span>
            </Button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex gap-[1.5px] bg-white rounded-[10px] shadow-[6px_0px_6px_6px_#00000040] min-h-[600px]">
          {/* Left Settings Menu */}
          <aside className="w-[270px] flex flex-col pt-[20px] px-4 border-r border-[#0000001a]">
            {settingsMenuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-[10px] px-5 py-[18px] rounded-[5px] transition-colors [font-family:'Poppins',Helvetica] ${
                    isActive
                      ? "bg-[#0b1739] text-white"
                      : "text-black hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-[18px] h-[18px]" />
                  <span className="font-normal text-base">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Right Content */}
          <section className="flex-1 pt-[30px] px-10 pb-8">
            {renderContent()}
          </section>
        </div>
      </div>
    </div>
  );
};

