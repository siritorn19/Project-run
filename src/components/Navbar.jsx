import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <Nav className="me-auto">
          <Nav.Link
            href="/medalpage"
            className={
              location.pathname === "/medalpage"
                ? "nav-link active bg-dark text-white"
                : "nav-link"
            }
            style={{
              color: location.pathname === "/medalpage" ? "white" : "black",
              backgroundColor:
                location.pathname === "/medalpage"
                  ? "darkgreen"
                  : "transparent",
            }}
          >
            <b>รับเหรียญ​รางวัล</b>
          </Nav.Link>
          <Nav.Link
            href="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "nav-link active bg-dark text-white"
                : "nav-link"
            }
            style={{
              color: location.pathname === "/dashboard" ? "white" : "black",
              backgroundColor:
                location.pathname === "/dashboard"
                  ? "darkgreen"
                  : "transparent",
            }}
          >
            <b>DashBoard</b>
          </Nav.Link>
          <Nav.Link
            href="/export"
            className={
              location.pathname === "/export"
                ? "nav-link active bg-dark text-white"
                : "nav-link"
            }
            style={{
              color: location.pathname === "/export" ? "white" : "black",
              backgroundColor:
                location.pathname === "/export" ? "darkgreen" : "transparent",
            }}
          >
            <b>Export</b>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout} className="nav-link">
            <b>Logout</b>
          </Nav.Link>
        </Nav>
      </Container>
    </nav>
  );
};

export default Navbar;
