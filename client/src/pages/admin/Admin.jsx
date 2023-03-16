import React from "react";
import {Col, Row, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./admin.css";

function Admin() {
  return (
    <>
      <div>
        <h2 className="mb-5">Admin Dashboard</h2>
        <Row className="adminPanel">
          <Col md={2} className="leftPanel">
            <div>Categories</div>
          </Col>
          <Col md={10}>
            <div className="ms-5">
              <Link to={"../../forums/games"}>
                <div>Games</div>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Admin;
