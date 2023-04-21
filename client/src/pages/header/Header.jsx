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

function Header() {
  return (
    <Container className="px-5 py-3 headerBg">
      <Row>
        <Col md={3}>
          <a href="/">
            <p className="me-4 headerText">NamuWeb</p>
          </a>
        </Col>
        <Col md={3}></Col>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
