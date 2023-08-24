import React from "react";

import "./hamburger.styles.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CustomHamvurger = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar.Toggle
        aria-controls="offcanvasNavbar"
        id="offcanvasNavbarToggle"
      />
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavDropdown title="Furniture" id="offcanvasNavbarFurniture">
              {props.items &&
                props.items.map((item) => (
                  <Link
                    key={item.id}
                    style={{ textDecoration: "none" }}
                    to={`/furniture-category/${item.id}`}
                  >
                    <NavDropdown.Item
                      key={item.id}
                      className="dd-item"
                      href="#action/3.1"                      
                    >
                      {item.name}
                    </NavDropdown.Item>
                  </Link>
                ))}

              {/* <NavDropdown.Item id="" href="#action3">
                Sideboards & Media Furniture
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">
                Storage & Shelving
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">
                Coffee Tables & Dining Tables
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">Sitting</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Accessories</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Custom</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="#action2" id="offcanvasNavbarFurniture">
              Kitchen
            </Nav.Link>
            <NavDropdown title="About Us" id="offcanvasNavbarFurniture">
              <NavDropdown.Item id="" href="#action3">
                Hi!
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">
                About the Brand
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">Enthusiasm</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Production</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Sample sets</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Ordering</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Contact Us</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action2" id="offcanvasNavbarFurniture">
              Press
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </div>
  );
};
export default CustomHamvurger;
