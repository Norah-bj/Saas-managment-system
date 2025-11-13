import React, { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import { Switch } from "../../components/Switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

export const UsersRoles = () => {
  const [chwAssignment, setChwAssignment] = useState(false);
  const [accountApproval, setAccountApproval] = useState(false);
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const [inactiveDays, setInactiveDays] = useState("30 days");

  return (
    <div>
      <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-4">
        User & Roles
      </h2>
      <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm mb-8">
        Control user permissions and administrative hierarchies
      </p>

      <Card className="rounded-xl border border-[#0000008c] shadow p-10">
        <div className="flex flex-col gap-[30px]">
          {/* CHW Assignment */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                  CHW Assignment
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                  Allow automatic chw assignment to hospitals or sectors
                </p>
              </div>
              <Switch
                checked={chwAssignment}
                onCheckedChange={setChwAssignment}
              />
            </div>
            <div className="h-0 border-t border-[#0000001a] mt-[30px]" />
          </div>

          {/* Account creation approval flow */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                  Account creation approval flow
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                  Allow automatic chw assignment to hospitals or sectors
                </p>
              </div>
              <Switch
                checked={accountApproval}
                onCheckedChange={setAccountApproval}
              />
            </div>
            <div className="h-0 border-t border-[#0000001a] mt-[30px]" />
          </div>

          {/* Two-step verification */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                  Two-step verification (admins)
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                  Extra login for administrative accounts
                </p>
              </div>
              <Switch
                checked={twoStepVerification}
                onCheckedChange={setTwoStepVerification}
              />
            </div>
            <div className="h-0 border-t border-[#0000001a] mt-[30px]" />
          </div>

          {/* Inactive account */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                  Inactive account
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                  Disable users inactive for specified days
                </p>
              </div>
              <Select value={inactiveDays} onValueChange={setInactiveDays}>
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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
