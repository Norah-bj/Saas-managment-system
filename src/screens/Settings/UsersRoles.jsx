import React from "react";
import {
  BellIcon,
  SearchIcon,
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "../../components/ui";
import { Layout } from "../../layout/Layout";

const settingsMenuItems = [
  { label: "General information", icon: "/vector-3.svg" },
  { label: "User & Roles", icon: "/vector-5.svg", active: true },
  { label: "Notifications", icon: "/vector-4.svg" },
  { label: "Security", icon: "/vector-2.svg" },
  { label: "Appearance", icon: "/vector-9.svg" },
];

const roleSettings = [
  {
    title: "CHW Assignment",
    description: "Allow automatic chw assignment to hospitals or sectors",
    enabled: true,
    type: "toggle",
  },
  {
    title: "Account creation approval flow",
    description: "Allow automatic chw assignment to hospitals or sectors",
    enabled: true,
    type: "toggle",
  },
  {
    title: "Two-Step Verification (admins)",
    description: "Extra login for administrative accounts",
    enabled: true,
    type: "toggle",
  },
  {
    title: "Inactive account",
    description: "Disable users inactive for specified days",
    enabled: false,
    type: "select",
    selectValue: "30 days",
  },
];

export const UserRoles = () => {
  return (
    <Layout>
      <div className="bg-white w-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-[27px]">
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

          {/* Right Content */}
          <section className="flex-1 pt-[81px] px-[40px]">
            <h2 className="font-semibold text-black text-base mb-[18px]">
              User & Roles
            </h2>
            <p className="text-black text-sm mb-[30px]">
              Control user permissions and administrative hierarchies
            </p>

            <div className="rounded-xl border border-[#0000008c] shadow p-[40px]">
              <div className="flex flex-col gap-[60px]">
                {roleSettings.map((setting, index) => (
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
                        <Switch
                          checked={setting.enabled}
                          className="data-[state=checked]:bg-[#001240]"
                        />
                      ) : (
                        <Select defaultValue={setting.selectValue}>
                          <SelectTrigger className="w-[130px] h-[35px] rounded-[5px] border border-[#0000004d] text-[13px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15 days">15 days</SelectItem>
                            <SelectItem value="30 days">30 days</SelectItem>
                            <SelectItem value="60 days">60 days</SelectItem>
                            <SelectItem value="90 days">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    {index < roleSettings.length - 1 && (
                      <div className="h-0 border-t border-[#0000001a] mt-[60px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
