import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function FooterComponent() {
  let currentYear = new Date();

  return (
    <Container className="bg-darkBlue text-light py-3">
      <Row>
        <Col className="text-center">
          <div className="d-flex justify-content-center">
            <p className="me-1 mb-0">Namuweb,</p>
            <p className="mb-0">Copyright: &copy;</p>
            <p className="mb-0">
              <Moment format="YYYY" className="fw-light">
                {currentYear}
              </Moment>
            </p>
          </div>
          <p>Developed by Soo Hwangbo</p>
          <p className="me-2 mb-0">For any inquiries please contact:</p>
          <a className="emailLink" href="mailto: shwangbo80@gmail.com">
            shwangbo80@gmail.com
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default FooterComponent;
