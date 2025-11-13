import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./screens/Dashboard";
import { AmbulanceTracker } from "./screens/AmbulanceTracker";
import { ReportsAnalytics } from "./screens/ReportsAnalytics";
import { UserManagement } from "./screens/UserManagement";
import { CHWManagement } from "./screens/CHWManagement";
import { EmergencyAlerts } from "./screens/EmergencyAlerts";
import { Appointments } from "./screens/Appointments";
import { Settings } from "./screens/Settings";
import { Login } from "./screens/Login";
import { Signup1, Signup2, Signup3 } from "./screens/Signup";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes without Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup-1" element={<Signup1 />} />
          <Route path="/signup-2" element={<Signup2 />} />
          <Route path="/signup-3" element={<Signup3 />} />

          {/* Protected routes with Layout */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/ambulance-tracker" element={<AmbulanceTracker />} />
                    <Route path="/reports-analytics" element={<ReportsAnalytics />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/chw-management" element={<CHWManagement />} />
                    <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
