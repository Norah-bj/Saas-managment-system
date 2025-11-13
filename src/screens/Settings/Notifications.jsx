import React, { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import { Switch } from "../../components/Switch";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { X, Plus, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

export const Notifications = () => {
  const [smsReminders, setSmsReminders] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [reminderSchedule, setReminderSchedule] = useState("");
  const [keywords, setKeywords] = useState(["Bleeding", "Fever", "Diarrhea", "Headache"]);
  const [newKeyword, setNewKeyword] = useState("");

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((k) => k !== keywordToRemove));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  return (
    <div className="space-y-[30px]">
      {/* Notifications & Alerts */}
      <div>
        <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
          Notifications & Alerts
        </h2>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm mb-6">
          Control user permissions and administrative hierarchies
        </p>

        <Card className="rounded-xl border border-[#0000008c] shadow p-10">
          <div className="flex flex-col gap-[30px]">
            {/* SMS reminders */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    SMS reminders
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Automatic messages for appointments and follow-ups.
                  </p>
                </div>
                <Switch
                  checked={smsReminders}
                  onCheckedChange={setSmsReminders}
                />
              </div>
              <div className="h-0 border-t border-[#0000001a] mt-[30px]" />
            </div>

            {/* Reminder schedules */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    Reminder schedules
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Time before appointment to send reminder.
                  </p>
                </div>
                <Select value={reminderSchedule} onValueChange={setReminderSchedule}>
                  <SelectTrigger className="w-[130px] h-[35px] rounded-[5px] border border-[#0000004d] text-[13px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="2 days">2 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-0 border-t border-[#0000001a] mt-[30px]" />
            </div>

            {/* Email notifications */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    Email notifications
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Extra login for administrative accounts.
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="h-0 border-t border-[#0000001a] mt-[30px]" />
            </div>

            {/* In-App notifications */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    In-App notifications
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Pop-up alerts for CHWs and administrators.
                  </p>
                </div>
                <Switch
                  checked={inAppNotifications}
                  onCheckedChange={setInAppNotifications}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Danger Sign Keywords */}
      <div>
        <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-8">
          Danger Sign Keywords
        </h2>

        <Card className="rounded-xl border border-[#0000008c] shadow p-10">
          <div className="flex flex-wrap gap-4 mb-12">
            {keywords.map((keyword, index) => (
              <Badge
                key={index}
                className="bg-[#d9d9d9] text-black text-[10px] h-[29px] px-4 rounded-[5px] flex items-center gap-2 [font-family:'Poppins',Helvetica] font-normal"
              >
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="hover:opacity-70"
                >
                  <X className="w-[9px] h-[9px]" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Plus className="w-[13px] h-[13px] text-black" />
            <span className="[font-family:'Poppins',Helvetica] font-normal text-black text-[10px]">
              Add a new keyword
            </span>
            <Input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
              className="flex-1 h-[22px] text-[10px] border border-gray-300 rounded-sm [font-family:'Poppins',Helvetica]"
            />
            <Button
              onClick={handleAddKeyword}
              className="ml-auto bg-[#d9d9d9] text-black text-[10px] h-[22px] px-4 rounded-sm hover:bg-[#c9c9c9] [font-family:'Poppins',Helvetica]"
            >
              Add
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
