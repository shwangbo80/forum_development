import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./admin.css";

function Admin() {
  return (
    <>
      <div>
        <h2 className="mb-4">Admin Dashboard</h2>
        <div className="mb-4">
          <Link to={"../../forums/createTopic"}>
            <Button className="btn-secondary">Create a topic</Button>
          </Link>
        </div>
        <Row className="adminPanel">
          <Col md={2} className="leftPanel">
            <div>Categories</div>
          </Col>
          <Col md={10}>
            <div className="ms-4">
              <div>
                <Link to={"../../forums/createTopic"}>Games</Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Admin;
