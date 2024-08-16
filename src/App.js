import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MedalsPage from "./components/MedalsPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Invoice from "./components/InvoicePage";
import Dashboard from "./components/Dashboard";
import Export from "./components/Export";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/medalpage"
          element={
            <PrivateRoute>
              <MedalsPage />
            </PrivateRoute>
          }
        />
         <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/export"
          element={
            <PrivateRoute>
              <Export />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
