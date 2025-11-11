import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./screens/Dashboard";
import { AmbulanceTracker } from "./screens/AmbulanceTracker";
import { ReportsAnalytics } from "./screens/ReportsAnalytics";
import { UserManagement } from "./screens/UserManagement";
import { CHWManagement } from "./screens/CHWManagement";
import { EmergencyAlerts } from "./screens/EmergencyAlerts";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ambulance-tracker" element={<AmbulanceTracker />} />
          <Route path="/reports-analytics" element={<ReportsAnalytics />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/chw-management" element={<CHWManagement />} />
          <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="/appointments" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
