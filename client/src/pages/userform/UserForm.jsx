import {Form, Container, Row, Col} from "react-bootstrap";
import "./userinfo.css";

function UserForm() {
  return (
    <Container className="py-5">
      <Row className="userInfoContainer p-5">
        <Col className="p-5">
          <h1>User information</h1>
          <Form className="mt-5">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="signatureFormn"
                type="text"
                placeholder="Your unique username"
                required={true}
                Rows="5"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Signature</Form.Label>
              <Form.Control as="textarea" rows={3} className="signatureForm" />
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default UserForm;
