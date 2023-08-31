import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const headerGradient = "linear-gradient(to right, #A06CD5, #6247AA)";
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const categories = useCategory();
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
              <Badge count={cart?.length} showZero>
                <Nav.Link style={{ color: "white" }} href="/cart">
                  Cart 🛒
                </Nav.Link>
              </Badge>
              <SearchInput />
              {/* <Nav.Link style={{ color: "white" }} href="/search">
                Search🧙
              </Nav.Link> */}
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
              <div className="dropdown">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li key="all">
                      <Link className="dropdown-item" to={"/categories"}>
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li key={c._id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
