import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import userData from '../data/userData.json';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState(userData);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate login credentials
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <Container style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleLogin}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
