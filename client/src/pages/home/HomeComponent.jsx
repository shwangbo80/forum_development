import React from "react";
import Profile from "../profile/Profile";
import {Row, Col} from "react-bootstrap";
function HomeComponent() {
  return (
    <Row>
      <Col>HomeComponent</Col>
      <Col>
        <Profile />
      </Col>
    </Row>
  );
}

export default HomeComponent;
