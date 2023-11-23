import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap"; //need it
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import logo from "../assets/logo_ishop.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { selectAuth, logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Header = () => {
  const { cartItems } = useSelector(selectCart);
  const { userInfo } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" fixed="">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" width={60} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-n av">
            <Nav className="ms-auto">
              <LinkContainer to="/cart" style={{ position: "relative" }}>
                <Nav.Link>
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        position: "absolute",
                        padding: "0px 2px",
                        borderRadius: "100%",
                        top: "5px",
                      }}
                    >
                      {cartItems.reduce(
                        (a, c) => (a + c.qty < 99 ? a + c.qty : "99+"),
                        0
                      )}
                    </Badge>
                  )}
                  <FaCartShopping className="mx-2"></FaCartShopping>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser className="mx-2"></FaUser>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* <DropdownButton
            drop="down-centered"
            title="Menu"
            className="button-menu"
          >
            <LinkContainer to={"cart"}>
              <Dropdown.Item>Cart</Dropdown.Item>
            </LinkContainer>
            <Dropdown.Divider />
            <LinkContainer to={"login"}>
              <Dropdown.Item>Login</Dropdown.Item>
            </LinkContainer>
          </DropdownButton> */}
        </Container>
      </Navbar>
      <div className="nav-menu">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="womenDropdown" role="button" data-toggle="dropdown">
          Women
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/women/item1">Item 1</a>
          <a class="dropdown-item" href="/women/item2">Item 2</a>
          <a class="dropdown-item" href="/women/item3">Item 3</a>
        </div>
      </li>
      
    </ul>

</nav>
      </div>
    </header>
  );
};

export default Header;
