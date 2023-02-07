import {useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navbar.css";
import LoginButton from "../pages/login/Login";
import LogoutButton from "../pages/logout/Logout";
import {Link, Router} from "react-router-dom";
function NavbarComponent() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark">
      <Container className="px-5">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex">
            <Link to={"forums/games"}>
              <p className="navText">Games</p>
            </Link>
            <Link to={"forums/entertainment"}>
              <p className="navText">Entertainment</p>
            </Link>
            <Link to={"forums/sports"}>
              <p className="navText">Sports</p>
            </Link>
            <Link to={"forums/tech"}>
              <p className="navText">Tech</p>
            </Link>
            <Link to={"forums/lifestyle"}>
              <p className="navText">Lifestyle</p>
            </Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <LoginButton />
            </Nav.Link>
            <Nav.Link>
              <LogoutButton />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
