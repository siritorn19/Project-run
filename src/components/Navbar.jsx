// Navbar.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // ลบการเก็บค่า login ออกจาก local storage
    navigate("/login"); // เปลี่ยนเส้นทางไปที่หน้าล็อกอิน
  };

  return (
    <nav className="navbar bg-body-tertiary shadow p-3 mb-5 bg-white rounded">
      <Container fluid>
        <span className="navbar-brand mb-0 h1">Project Run</span>
        <Button variant="default" onClick={handleLogout} style={{ marginLeft: "auto" }}>
          <b>Logout</b>
        </Button>
      </Container>
    </nav>
  );
};

export default Navbar;
