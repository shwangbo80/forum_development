import React from "react";
import {Container, Button, Form, InputGroup, Row, Col} from "react-bootstrap";
import "./header.css";

function Header() {
  return (
    <Container className="px-5 py-3">
      <Row>
        <Col md={3}>
          <a href="/">
            <p className="me-4 headerText">NamuWeb</p>
          </a>
          <p className="descText">Forum for communities</p>
        </Col>
        <Col md={3}></Col>
        <Col>
          <InputGroup className="mb-3 searchForm">
            <Form.Control
              placeholder="Search topics"
              aria-label="Search topics"
              aria-describedby="basic-addon2"
            />
            <Button className="bg-light text-dark" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
