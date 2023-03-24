import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./createTopic.css";

//topic name

function CreateTopic() {
  return (
    <>
      <div>
        <h2 className="mb-5">Create Topic</h2>
        <Row>
          <Col md={10}>
            <div>
              <Form.Label>Topic</Form.Label>
              <Form.Control type="text" placeholder="Create Topic Title here" />
            </div>
            <div className="mt-5">
              <Button>Submit</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateTopic;
