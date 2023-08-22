import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  const headerGradient = "linear-gradient(to right, #A06CD5, #6247AA)";

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ background: headerGradient, color: "white" }}
      >
        <Container>
          <Navbar.Brand href="/">SIHANAA👜 </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/category">Categories</Nav.Link>
              <Nav.Link href="/cart">Cart 🛒</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login" style={{ color: "white" }}>
                LOGIN
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="/register"
                style={{ color: "white" }}
              >
                SIGNUP
              </Nav.Link>
              <Nav.Link href="/login" style={{ color: "white" }}>
                LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
