import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";

const Spinnerr = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #A06CD5, #6247AA)",
  };

  return (
    <div style={spinnerContainerStyle}>
      <h1>Redirecting you in {count} seconds</h1>
      <Spinner animation="border" variant="info" />
    </div>
  );
};

export default Spinnerr;
