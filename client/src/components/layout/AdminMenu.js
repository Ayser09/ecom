import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
const AdminMenu = () => {
  return (
    <>
      <h1>ADMIN PANEL</h1>

      <Nav className="p-3 m-3">
        <div>
          {" "}
          <ListGroup className="flex">
            <ListGroup.Item
              as={Link}
              to="/dashboard/admin/create-category"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              Create Category
            </ListGroup.Item>
            <ListGroup.Item
              as={Link}
              to="/dashboard/admin/create-product"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              Create Products
            </ListGroup.Item>
            <ListGroup.Item
              as={Link}
              to="/dashboard/admin/products"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              Products
            </ListGroup.Item>
            <ListGroup.Item
              as={Link}
              to="/dashboard/admin/users"
              style={{ fontSize: "24px" }}
              action
              variant="info"
            >
              Customers
            </ListGroup.Item>
            {/* Add more menu items as needed */}
          </ListGroup>
        </div>
      </Nav>
    </>
  );
};

export default AdminMenu;
