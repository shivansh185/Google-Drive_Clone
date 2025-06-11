// src/App.js
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/_auth/signup";
import Login from "./components/_auth/login";
import Profile from "./components/_auth/Profile"
import ForgotPassword from "./components/_auth/forgotPassword";
import UpdateProfile from "./components/_auth/updateProfile";
import CenteredContainer from "./components/_auth/centeredContainer";

import { AuthProvider, useAuth } from "./context/authContext"; // Adjust path if needed
import Dashboard from "./components/Drive-Clone/Dashboard";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
        <div className="w-100" style={{ maxWidth: "100vw" }}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
             <Route
              path="/folder/:folderId"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

    </AuthProvider>
  );
}

export default App;
