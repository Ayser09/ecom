import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const UserMenu = () => {
  const userMenuGradient = "linear-gradient(to right, #A06CD5, #6247AA)";

  return (
    <>
      <div
        style={{
          background: userMenuGradient,
          borderRadius: "10px",
          padding: "20px",
          color: "white",
        }}
      >
        <h2>USER DASHBOARD</h2>
        <Nav className="p-3 m-3">
          <ListGroup className="flex">
            <ListGroup.Item
              as={Link}
              to="/dashboard/user/profile"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              Profile
            </ListGroup.Item>

            <ListGroup.Item
              as={Link}
              to="/dashboard/user/orders"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              Orders
            </ListGroup.Item>
            {/* <ListGroup.Item
              as={Link}
              to="/dashboard/user/users"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              {/* Add more menu items as needed */}
            {/* </ListGroup.Item> */}
          </ListGroup>
        </Nav>
      </div>
    </>
  );
};

export default UserMenu;
