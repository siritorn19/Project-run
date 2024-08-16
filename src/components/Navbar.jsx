// Navbar.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const handleReload = () => {
    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary shadow p-3 mb-5 bg-white rounded">
      <Container fluid>
        <span className="navbar-brand mb-0 h1" onClick={handleReload}>
          BigC running together [{`${process.env.REACT_APP_ENV}`}]
        </span>
        <Button
          as="a"
          href="./medalpage"
          variant="success"
          style={{ marginLeft: "5px" }}
        >
          <b>รับเหรียญ​รางวัล</b>
        </Button>
        <Button
          variant="default"
          onClick={handleLogout}
          style={{ marginLeft: "auto" }}
        >
          <b>Logout</b>
        </Button>
      </Container>
    </nav>
  );
};

export default Navbar;
