import React from "react";
import { Card, CardContent } from "../../components/Card";
import { Input } from "../../components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

export const GeneralInformation = () => {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="rounded-xl border border-[#0000008c] shadow p-10">
        <div className="mb-6">
          <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-2">
            Basic information
          </h3>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
            Lorem ipsum dolor sit amet consectetur adipiscing.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              Hospital name
            </label>
            <Select defaultValue="shyira">
              <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shyira">Shyira hospital</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              Facility code
            </label>
            <Select defaultValue="ceo">
              <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ceo">CEO & Founder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              Location
            </label>
            <Select defaultValue="ny">
              <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">New York, NY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              Facility type
            </label>
            <Select defaultValue="health">
              <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              Registration date
            </label>
            <Input
              type="date"
              defaultValue="2025-07-15"
              className="h-[38px] rounded-[3px] border border-[#0000004c]"
            />
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="rounded-xl border border-[#0000008c] shadow p-10">
        <div className="mb-6">
          <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-2">
            Contact information
          </h3>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm">
            Lorem ipsum dolor sit amet consectetur adipiscing.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              Hospital hotline
            </label>
            <Input
              type="text"
              defaultValue="Shyira hospital"
              className="h-[38px] rounded-[3px] border border-[#0000004c]"
            />
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              email
            </label>
            <Input
              type="email"
              defaultValue="CEO & Founder"
              className="h-[38px] rounded-[3px] border border-[#0000004c]"
            />
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              admin contact
            </label>
            <Input
              type="text"
              defaultValue="New York, NY"
              className="h-[38px] rounded-[3px] border border-[#0000004c]"
            />
          </div>
          <div>
            <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
              main phone line
            </label>
            <Input
              type="tel"
              defaultValue="Health center"
              className="h-[38px] rounded-[3px] border border-[#0000004c]"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
