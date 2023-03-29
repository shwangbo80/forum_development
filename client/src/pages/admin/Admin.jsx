import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./admin.css";

function Admin() {
  return (
    <>
      <div>
        <h2 className="mb-4">Admin Dashboard</h2>
        <div className="mb-4">
          <Link to={"../../forums/createCategory"}>
            <Button className="btn-secondary">Create a topic</Button>
          </Link>
        </div>
        <Row className="adminPanel">
          <Col md={2} className="leftPanel">
            <p className="text-dark fw-bold">
              <Link to={"./"}>Categories</Link>
            </p>
            <p className="text-dark fw-bold">
              <Link to={"./underreview"}>Under Review</Link>
            </p>
          </Col>
          <Col md={10}>
            <div className="ms-4">
              <Outlet />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Admin;
