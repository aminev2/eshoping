import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

const NavBarCategories = () => {
  return (
    <div className="d-flex align-items-center nav-menu">
      <Nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavDropdown title="Accessories" id="accessoriesDropdown">
          <NavDropdown.Item>Item 1</NavDropdown.Item>
          <NavDropdown.Item>Item 2</NavDropdown.Item>
          <NavDropdown.Item>Item 3</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Accessories" id="accessoriesDropdown">
          <NavDropdown.Item>Item 1</NavDropdown.Item>
          <NavDropdown.Item>Item 2</NavDropdown.Item>
          <NavDropdown.Item>Item 3</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default NavBarCategories;
