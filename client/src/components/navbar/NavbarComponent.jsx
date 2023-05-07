import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import LoginButton from "../../pages/login/Login";
import LogoutButton from "../../pages/logout/Logout";
import Verify from "../../pages/Verify/Verify";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function NavbarComponent() {
  const { user, isAuthenticated } = useAuth0();

  const renderLoginBtn = () => {
    if (!isAuthenticated) {
      return (
        <Nav.Link>
          <LoginButton />
        </Nav.Link>
      );
    } else if (!user.email_verified) {
      return (
        <>
          <Nav.Link>
            <LogoutButton />
          </Nav.Link>
        </>
      );
    } else if (isAuthenticated) {
      return (
        <Nav.Link>
          <LogoutButton />
        </Nav.Link>
      );
    }
  };

  const renderAdminButtonm = () => {
    if (!user) {
      return;
    }
    if (user.user_metadata.role === "admin") {
      return (
        <Link to={"admin"}>
          <p className="navText">Admin</p>
        </Link>
      );
    }
  };
  return (
    <Container className="px-0">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar bg-darkBlue"
        variant="dark"
      >
        <Container className="px-5 py-1">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto d-flex">
              <Link to={"forums/categories"}>
                <p className="navText">Forum</p>
              </Link>
              <Link to={"about"}>
                <p className="navText">About</p>
              </Link>
            </Nav>
            {renderAdminButtonm()}
            {renderLoginBtn()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavbarComponent;
