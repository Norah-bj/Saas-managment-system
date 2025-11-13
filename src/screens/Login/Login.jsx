import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useAuth } from "../../context/AuthContext";
import { useAdminLoginMutation } from "../../redux/api/adminSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/authSlice";

export const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  // const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    rememberMe: false,
  });

  const [login, isLoading]=useAdminLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulate auth success. Replace with real API call as needed.
    const res = await login({email:formData.email,password:formData.password, fullName: formData.role}).unwrap();
    setCredentials({user:res.user,access_token:res.access_token});
    setIsAuthenticated(true);
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath, { replace: true });
    } catch (error) {
     console.log(error);
     toast.error("failed login");
    }
  };


  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-stretch mx-auto">
        {/* Left - Welcome Panel */}
        <div className="hidden lg:flex items-stretch">
          <WelcomePanel className="h-full" />
        </div>

        {/* Right - Login Form */}
        <form action="" onSubmit={handleLogin}> 
          <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col space-y-6">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#001240] text-2xl mb-6">
            Login to Mother Link!
          </h1>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                FullName
              </label>
              <input 
                className="h-[45px] w-full focus:border-[#001240] rounded-lg border px-3 border-[#0000004c] [font-family:'Poppins',Helvetica]"
                type="text"  
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                placeholder="Your full name"/>
            </div>
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-[45px] rounded-lg border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-[45px] rounded-lg border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
              />
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                Remember Me
              </label>
            </div>
            <button
              className="[font-family:'Poppins',Helvetica] font-normal text-[#001240] text-sm hover:underline"
            >
              Forgot password
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              type="submit"
              className="flex-1 bg-[#001240] text-white hover:bg-[#001240]/90 h-[45px] rounded-lg [font-family:'Poppins',Helvetica] font-medium"
            >
              {isLoading ? "Login" : "loging in"}
            </Button>
            <Button
              onClick={() => navigate("/signup-1")}
              variant="outline"
              className="flex-1 border border-[#001240] text-[#001240] hover:bg-gray-50 h-[45px] rounded-lg [font-family:'Poppins',Helvetica] font-medium"
            >
              Sign Up
            </Button>
          </div>
        </div>
        </form>
      </div>
    </AuthBackground>
  );
};

