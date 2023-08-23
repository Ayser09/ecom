import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import React Bootstrap styles
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/layout/Layout";
const formStyle = {
  background: "linear-gradient(to right, #A06CD5, #6247AA)",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  maxWidth: "400px",
  margin: "auto",
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, newPassword, answer);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.messsage);
        navigate("/login");
      } else {
        toast.error(res.data.messsage);
      }
    } catch (error) {
      toast.error("login failed");
      console.log(error);
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <Container>
        <div style={formStyle}>
          <Form onSubmit={handleSubmit}>
            <h4>Reset Password</h4>
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
              <Form.Label>
                Enter Security Question Answer Favourite Food
              </Form.Label>
              <Form.Control
                type="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                placeholder="Enter your answer"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter your New password"
              />
            </Form.Group>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="primary"
              type="submit"
            >
              RESET
            </Button>
          </Form>
        </div>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
