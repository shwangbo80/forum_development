import React from "react";
import {Container} from "react-bootstrap";
import "./header.css";

function Header() {
  return (
    <Container className="d-flex align-items-center justify-content-between pt-5 pb-2 px-5">
      <div className="d-flex align-items-baseline">
        <a href="/">
          <h1 className="fw-bold  me-3 headerText">NamuWeb</h1>
        </a>
        <p className="text-dark">Forum for communities</p>
      </div>
    </Container>
  );
}

export default Header;
