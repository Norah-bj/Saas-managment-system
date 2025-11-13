import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { WelcomePanel } from "../../components/WelcomePanel";
import { AuthBackground } from "../../components/AuthBackground";

export const Signup1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    district: "",
    cell: "",
    physicalAddress: "",
    facilityType: "",
    sector: "",
    licenseNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProceed = () => {
    navigate("/signup-2");
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch mx-auto">
        {/* Left - Signup Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#000000] text-2xl mb-6">
            Signup to Mother Link!
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <Checkbox checked={true} />
            <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
              Organization information
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Organization name
              </label>
              <Input
                type="text"
                placeholder="e.g. Nyabihu district hospital"
                value={formData.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Type of facility
              </label>
              <Select value={formData.facilityType} onValueChange={(value) => handleInputChange("facilityType", value)}>
                <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                  <SelectValue placeholder="select facility type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="health-center">Health Center</SelectItem>
                  <SelectItem value="clinic">Clinic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                District
              </label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                  <SelectValue placeholder="select a district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nyabihu">Nyabihu</SelectItem>
                  <SelectItem value="kigali">Kigali</SelectItem>
                  <SelectItem value="musanze">Musanze</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Sector
              </label>
              <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                  <SelectValue placeholder="select a sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sector1">Sector 1</SelectItem>
                  <SelectItem value="sector2">Sector 2</SelectItem>
                  <SelectItem value="sector3">Sector 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Cell
              </label>
              <Select value={formData.cell} onValueChange={(value) => handleInputChange("cell", value)}>
                <SelectTrigger className="h-[38px] rounded-[3px] border border-[#0000004c]">
                  <SelectValue placeholder="select a cell" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cell1">Cell 1</SelectItem>
                  <SelectItem value="cell2">Cell 2</SelectItem>
                  <SelectItem value="cell3">Cell 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                License Number
              </label>
              <Input
                type="text"
                placeholder="e.g. HC-2004-1234"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div className="col-span-2">
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Physical address
              </label>
              <Input
                type="text"
                placeholder="e.g. Nyabihu main road near mukamina"
                value={formData.physicalAddress}
                onChange={(e) => handleInputChange("physicalAddress", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>
          </div>

          <Button
            onClick={handleProceed}
            className="w-full bg-[#001240] text-white hover:bg-[#001240]/90 h-[45px] rounded-lg mb-4 [font-family:'Poppins',Helvetica] font-medium"
          >
            Proceed
          </Button>

          <div className="text-center mb-4">
            <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
              Already have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="[font-family:'Poppins',Helvetica] font-medium text-[#001240] hover:underline"
            >
              Login
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 h-[45px] rounded-lg [font-family:'Poppins',Helvetica] font-medium"
            >
              <span className="text-xl font-bold mr-2">G</span>
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 h-[45px] rounded-lg [font-family:'Poppins',Helvetica] font-medium"
            >
              <span className="text-xl font-bold mr-2">f</span>
              Sign up with Facebook
            </Button>
          </div>
        </div>

        {/* Right - Welcome Panel */}
        <div className="hidden lg:flex items-stretch">
          <WelcomePanel className="h-full" />
        </div>
      </div>
    </AuthBackground>
  );
};

