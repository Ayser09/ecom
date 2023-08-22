import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import React Bootstrap styles
import Layout from "../components/layout/Layout";

const formStyle = {
  background: "linear-gradient(to right, #A06CD5, #6247AA)",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  maxWidth: "400px",
  margin: "auto",
};

const Login = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    // Your login logic here
  };

  return (
    <Layout>
      <Container>
        <div style={formStyle}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </Layout>
  );
};

export default Login;
