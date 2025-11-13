import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import { WelcomePanel } from "../../components/WelcomePanel";
import { AuthBackground } from "../../components/AuthBackground";

export const Signup2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    createPassword: "",
    phoneNumber: "",
    position: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProceed = () => {
    navigate("/signup-3");
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mx-auto">
        {/* Left - Signup Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#000000] text-2xl mb-6">
            Signup to Mother Link!
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <Checkbox checked={true} />
            <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
              Contact & Administrator details
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Full name
              </label>
              <Input
                type="text"
                placeholder="e.g. Nyabihu district hospital"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Phone number
              </label>
              <Input
                type="tel"
                placeholder="+250 7XX"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Email address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Position / Role
              </label>
              <Input
                type="text"
                placeholder="e.g. Hospital admin, CHW supervisor"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Create password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.createPassword}
                onChange={(e) => handleInputChange("createPassword", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Confirm password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
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

