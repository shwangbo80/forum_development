import {Container, Nav, Navbar} from "react-bootstrap";
import "./navbar.css";
import LoginButton from "../../pages/login/Login";
import LogoutButton from "../../pages/logout/Logout";
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

function NavbarComponent() {
  const {user, isAuthenticated} = useAuth0();

  const renderLoginBtn = () => {
    if (!isAuthenticated || !user.email_verified) {
      return (
        <Nav.Link>
          <LoginButton />
        </Nav.Link>
      );
    } else if (isAuthenticated) {
      return (
        <Nav.Link>
          <LogoutButton />
        </Nav.Link>
      );
    }
  };

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
          <Link to={"forums/admin"}>
            <p className="navText">Admin</p>
          </Link>
          <Nav>{renderLoginBtn()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
