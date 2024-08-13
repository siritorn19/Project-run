// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn"); // ตรวจสอบการล็อกอินจาก local storage

  return isLoggedIn ? children : <Navigate to="/login" />; // ถ้าล็อกอินแล้วก็ไปที่หน้า Home ไม่งั้นก็ไปหน้า Login
};

export default PrivateRoute;
