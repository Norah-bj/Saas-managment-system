import React, { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Settings as SettingsIcon, Image as ImageIcon, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

export const Appearance = () => {
  const [themeMode, setThemeMode] = useState("light");
  const [accentColors, setAccentColors] = useState("Purple & Blue");

  const colorPalette = [
    "#4A90E2",
    "#5B9BD5",
    "#6CA6C8",
    "#7DB1BB",
    "#0b1739",
  ];

  return (
    <div className="space-y-6">
      {/* Customization & Appearance */}
      <div>
        <Card className="rounded-xl border border-[#0000008c] shadow p-10">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
              Customization & Appearance
            </h3>
          </div>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm mb-8">
            UI configuration and branding settings
          </p>

          <div className="space-y-6">
            {/* Theme Mode */}
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                Theme Mode
              </label>
              <Select value={themeMode} onValueChange={setThemeMode}>
                <SelectTrigger className="w-full h-[38px] rounded-[3px] border border-[#0000004c]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Accent colors */}
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                Accent colors
              </label>
              <Select value={accentColors} onValueChange={setAccentColors}>
                <SelectTrigger className="w-full h-[38px] rounded-[3px] border border-[#0000004c]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Purple & Blue">Purple & Blue</SelectItem>
                  <SelectItem value="Green & Teal">Green & Teal</SelectItem>
                  <SelectItem value="Red & Orange">Red & Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color palette preview */}
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-3">
                Color palette
              </label>
              <div className="flex gap-2">
                {colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-[3px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Logo & Branding */}
      <div>
        <Card className="rounded-xl border border-[#0000008c] shadow p-10">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
              Logo & Branding
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                system logo
              </label>
              <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-[3px] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
                    upload a new logo for the system
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-[#001240] text-white hover:bg-[#001240]/90 h-auto px-4 py-2 rounded-[3px] [font-family:'Poppins',Helvetica] font-medium text-sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload logo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

