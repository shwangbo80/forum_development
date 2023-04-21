import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function FooterComponent() {
  let currentYear = new Date();

  return (
    <Container className="p-0  bg-dark text-light">
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <div className="px-5 py-3 text-center">
        <div className="d-flex justify-content-center">
          <p className="me-1">Namuweb,</p>
          <p>Copyright: &copy;</p>
          <p>
            <Moment format="YYYY" className="fw-light">
              {currentYear}
            </Moment>
          </p>
        </div>
        <p>Developed by Soo Hwangbo</p>
        <div className="d-flex justify-content-center">
          <p className="me-2">For any inquiries please contact:</p>
          <p>
            <a className="emailLink" href="mailto: shwangbo80@gmail.com">
              shwangbo80@gmail.com
            </a>
          </p>
        </div>
        <div className="d-flex justify-content-center"></div>
      </div>
    </Container>
  );
}

export default FooterComponent;
