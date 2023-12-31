import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import React Bootstrap styles
import Layout from "../components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth";
const formStyle = {
  background: "linear-gradient(to right, #A06CD5, #6247AA)",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  maxWidth: "400px",
  margin: "auto",
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success("login successfully");
        toast.success(res.data.messsage);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.messsage);
      }
    } catch (error) {
      toast.error("login failed");
      console.log(error);
    }

    // Your registration logic here
  };

  return (
    <Layout>
      <Container>
        <div style={formStyle}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => {
                navigate("/forgot-password");
              }}
              style={{ marginLeft: "150px", marginRight: "auto" }}
            >
              Forgot Password
            </Button>
          </Form>
        </div>
      </Container>
    </Layout>
  );
};

export default Login;
