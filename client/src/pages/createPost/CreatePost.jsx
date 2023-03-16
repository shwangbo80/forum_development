import React from "react";
import {Row, Col, Form, Button} from "react-bootstrap";

function CreatePost() {
  return (
    <>
      <div>
        <h2 className="mb-5">Create Post</h2>
        <Row>
          <Col md={10}>
            <div>
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div className="mt-4">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" aria-describedby="passwordHelpBlock" />
              <Form.Text muted>
                Your post title must be 5-30 characters long, and contain
                letters and numbers.
              </Form.Text>
            </div>
            <div className="mt-4">
              <Form.Label>Post Body</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Post body here"
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

export default CreatePost;
