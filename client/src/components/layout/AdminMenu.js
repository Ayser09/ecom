import React from "react";
import Layout from "./Layout";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useAuth } from "../../context/auth";
const AdminMenu = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <h1>ADMIN PANEL</h1>
        <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
          <div>
            {" "}
            <ListGroup className="flex-column ">
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
                to="/dashboard/admin/orders"
                style={{ fontSize: "24px" }}
                action
                variant="info"
              >
                Orders
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
          <div className="card col-md-9">
            <h2>Admin name : {auth?.user?.name} </h2>
            <h2>Admin email: {auth?.user?.email} </h2>
            <h2>Admin phone: {auth?.user?.phone} </h2>
          </div>
        </Nav>
      </Layout>
    </>
  );
};

export default AdminMenu;
