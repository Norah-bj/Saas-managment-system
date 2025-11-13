import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import { WelcomePanel } from "../../components/WelcomePanel";
import { AuthBackground } from "../../components/AuthBackground";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = location.state?.from?.pathname || "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { email, password } = formData;
      const result = await login(email, password);
      
      if (result.success) {
        toast.success("Login successful!");
        const redirectPath = location.state?.from?.pathname || "/dashboard";
        navigate(redirectPath, { replace: true });
      } else {
        toast.error(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-stretch mx-auto">
        {/* Left side */}
        <div className="hidden lg:flex items-stretch"> 
          <WelcomePanel className="h-full" />
        </div>

        {/* Right side - form */}
        <form onSubmit={handleLogin}>
          <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col space-y-6">
            <h1 className="font-bold text-[#001240] text-2xl mb-6">
              Login to Mother Link!
            </h1>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-[45px] rounded-lg border border-[#0000004c]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-[45px] rounded-lg border border-[#0000004c]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="h-[45px] rounded-lg border border-[#0000004c]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    handleInputChange("rememberMe", checked)
                  }
                />
                <label className="text-sm">Remember Me</label>
              </div>
              <button className="text-sm text-[#001240] hover:underline">
                Forgot password
              </button>
            </div>

            <div className="flex gap-3 mb-6">
              <Button
                type="submit"
                className="flex-1 bg-[#001240] text-white hover:bg-[#001240]/90 h-[45px] rounded-lg"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                onClick={() => navigate("/signup-1")}
                variant="outline"
                className="flex-1 border border-[#001240] text-[#001240] hover:bg-gray-50 h-[45px] rounded-lg"
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
