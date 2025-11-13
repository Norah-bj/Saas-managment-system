import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
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
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  // Auth routes
  { path: "/login", element: <Login /> },
  { path: "/signup-1", element: <Signup1 /> },
  { path: "/signup-2", element: <Signup2 /> },
  { path: "/signup-3", element: <Signup3 /> },

  // Protected routes with Layout
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "ambulance-tracker", element: <AmbulanceTracker /> },
      { path: "reports-analytics", element: <ReportsAnalytics /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "chw-management", element: <CHWManagement /> },
      { path: "emergency-alerts", element: <EmergencyAlerts /> },
      { path: "appointments", element: <Appointments /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </Provider>
);

export default App;
