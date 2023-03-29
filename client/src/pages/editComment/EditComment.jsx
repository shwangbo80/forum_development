import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function EditComment() {
  return (
    <>
      <div>
        <h2 className="mb-5">Edit Comment</h2>
        <Row>
          <Col md={10}>
            <div>
              <Form.Label>Comment Body</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Post comment here"
                rows={10}
              />
              <Form.Text muted>Please follow forum Terms of Service</Form.Text>
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

export default EditComment;
