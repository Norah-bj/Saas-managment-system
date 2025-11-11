import React from "react";
import {
  BellIcon,
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";
import { Layout } from "../../layout/Layout"; // ✅ Import your sidebar layout

const settingsMenuItems = [
  { label: "General information", icon: "/vector-3.svg" },
  { label: "User & Roles", icon: "/vector-5.svg" },
  { label: "Notifications", icon: "/vector-4.svg", active: true },
  { label: "Security", icon: "/vector-2.svg" },
  { label: "Appearance", icon: "/vector-9.svg" },
];

const notificationSettings = [
  {
    title: "SMS reminders",
    description: "Automatic messages for appointments and followups",
    enabled: true,
    type: "toggle",
  },
  {
    title: "Reminder schedules",
    description: "Time before appointment to send reminder",
    enabled: false,
    type: "select",
  },
  {
    title: "Email notifications",
    description: "Extra login for administrative accounts",
    enabled: true,
    type: "toggle",
  },
  {
    title: "In-App Notifications",
    description: "Pop-up alerts for CHWs and administrators",
    enabled: true,
    type: "toggle",
  },
];

const dangerKeywords = [
  { id: 1, label: "bleeding" },
  { id: 2, label: "fever" },
  { id: 3, label: "dizziness" },
  { id: 4, label: "headache" },
];

export const Notifications = () => {
  return (
    <Layout>
      <div className="bg-white w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-[27px]">
          <div>
            <h1 className="font-semibold text-black text-2xl mb-[10px]">
              Profile settings
            </h1>
            <p className="text-black text-sm">
              Manage system rules, roles, and configurations across hospitals
              and CHWs
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-40 h-10 rounded-[3px] border border-[#0000004c] font-medium text-black text-sm"
            >
              Save changes
            </Button>
            <Button className="w-40 h-10 bg-[#001240] hover:bg-[#001240]/90 text-white text-xs rounded-sm">
              <PlusIcon className="w-6 h-6 mr-1" />
              Restore default
            </Button>
          </div>
        </div>

        <div className="flex gap-[1.5px] bg-white rounded-[10px] shadow-[6px_0px_6px_6px_#00000040] min-h-[800px]">
          {/* Left Settings Menu */}
          <aside className="w-[270px] flex flex-col gap-[59px] pt-[81px] px-[16px] border-r border-[#0000001a]">
            {settingsMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-[37px] px-[20px] py-[18px] rounded-[5px] ${
                  item.active ? "bg-[#0b1739]" : ""
                }`}
              >
                <img
                  className="w-[18px] h-[18px]"
                  alt={item.label}
                  src={item.icon}
                />
                <span
                  className={`font-normal text-base ${
                    item.active ? "text-white" : "text-black"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </aside>

          {/* Right Content Section */}
          <section className="flex-1 pt-[81px] px-[40px]">
            {/* Notification Settings */}
            <div className="mb-[60px]">
              <h2 className="font-semibold text-black text-base mb-[18px]">
                Notifications & Alerts
              </h2>
              <p className="text-black text-sm mb-[30px]">
                Control user permissions and administrative hierarchies
              </p>

              <div className="rounded-xl border border-[#0000008c] shadow p-[40px]">
                <div className="flex flex-col gap-[60px]">
                  {notificationSettings.map((setting, index) => (
                    <div key={index}>
                      <div className="flex items-start justify-between mb-[12px]">
                        <div className="flex-1">
                          <h3 className="font-semibold text-black text-[13px] mb-[8px]">
                            {setting.title}
                          </h3>
                          <p className="text-black text-[13px]">
                            {setting.description}
                          </p>
                        </div>
                        {setting.type === "toggle" ? (
                          <div className="flex items-center gap-2">
                            {index === 0 && (
                              <Badge className="bg-[#d9d9d9] text-black text-[10px] h-[22px] px-3 rounded-sm">
                                Default
                              </Badge>
                            )}
                            <Switch
                              checked={setting.enabled}
                              className="data-[state=checked]:bg-[#001240]"
                            />
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-[19px] h-[19px]"
                          >
                            <ChevronDownIcon className="w-[19px] h-[19px]" />
                          </Button>
                        )}
                      </div>
                      {index < notificationSettings.length - 1 && (
                        <div className="h-0 border-t border-[#0000001a] mt-[60px]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Danger Sign Keywords */}
            <div>
              <h2 className="font-semibold text-black text-base mb-[30px]">
                Danger Sign Keywords
              </h2>

              <div className="rounded-xl border border-[#0000008c] shadow p-[40px]">
                <div className="flex flex-wrap gap-[18px] mb-[53px]">
                  {dangerKeywords.map((keyword) => (
                    <Badge
                      key={keyword.id}
                      className="bg-[#d9d9d9] text-black text-[10px] h-[29px] px-4 rounded-[5px] flex items-center gap-2"
                    >
                      {keyword.label}
                      <XIcon className="w-[9px] h-[9px] cursor-pointer" />
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <PlusIcon className="w-[13px] h-[13px]" />
                  <span className="text-black text-[10px]">Add a new keyword</span>
                  <Button className="ml-auto bg-[#d9d9d9] text-black text-[10px] h-[22px] px-4 rounded-sm">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
