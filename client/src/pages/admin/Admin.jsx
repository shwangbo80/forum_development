import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";
import { useAuth0 } from "@auth0/auth0-react";

function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let navigate = useNavigate();

  if (!user) {
    return navigate(`../`);
  } else if (user.user_metadata.role != "admin") {
    return navigate(`../`);
  } else if (user.user_metadata.role === "admin") {
    return (
      <>
        <div>
          <h2 className="mb-4">Admin Dashboard</h2>
          <div className="mb-4">
            <Link to={"../../forums/createCategory"}>
              <Button className="btn-secondary">Create a category</Button>
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
}

export default Admin;
