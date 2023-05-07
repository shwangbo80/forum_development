import React from "react";
import {
  Container,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Navbar,
} from "react-bootstrap";
import "./header.css";
import "../../components/navbar/NavbarComponent";
import Profile from "../profile/Profile";

function Header() {
  return (
    <Container className="px-5 py-3 headerBg">
      <Row>
        <Col>
          <p className="me-4 headerText">
            <a href="/" className="text-dark">
              Community Forum{" "}
            </a>
          </p>
        </Col>
        <Col>
          {/* <InputGroup className="mb-3 searchForm">
            <Form.Control
              placeholder="Search posts"
              aria-label="Search posts"
              aria-describedby="basic-addon2"
            />
            <Button className="bg-light text-dark" id="button-addon2">
              Search
            </Button>
          </InputGroup> */}
          <Profile />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
