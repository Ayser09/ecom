import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const headerGradient = "linear-gradient(to right, #A06CD5, #6247AA)";
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };
  const handlePress = () => {
    navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ background: headerGradient, color: "white" }}
      >
        <Container>
          <Navbar.Brand href="/">ECOMMERCE👜 </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="categoriesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    color: "white",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  Categories
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="categoriesDropdown"
                >
                  <li>
                    <Nav.Link className="dropdown-item" href="#">
                      Category One
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className="dropdown-item" href="#">
                      Category Two
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className="dropdown-item" href="#">
                      Category Three
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className="dropdown-item" href="#">
                      Category Four
                    </Nav.Link>
                  </li>
                </ul>
              </div>
              <Nav.Link style={{ color: "white" }} href="/cart">
                Cart 🛒
              </Nav.Link>
            </Nav>
            <Nav>
              {!auth.user ? (
                <>
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
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={handleLogout}
                    to="/login"
                    style={{ color: "white" }}
                  >
                    LogOut
                  </Nav.Link>
                  <Nav.Link onClick={handlePress} style={{ color: "white" }}>
                    {auth?.user?.name}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
