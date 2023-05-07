import { React, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const CreateCategory = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categoryNameErrMessage, setCategoryNameErrMessage] = useState("");
  const [categoryDescErrMessage, setCategoryDescErrMessage] = useState("");
  const [submitEnabled, setSubmitDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.length < 5) {
      setCategoryNameErrMessage("post name must be at least 5 characters");
      return;
    } else {
      setCategoryNameErrMessage("");
    }
    if (categoryDesc.length === 0) {
      setCategoryDescErrMessage("post body must be at least 5 characters");
      return;
    } else {
      setCategoryDescErrMessage("");
    }

    if (categoryName.length >= 5 && categoryDesc.length >= 1) {
      try {
        setSubmitDisabled(true);
        const categoryNameTrim = categoryName.trim();
        const categoryNameToUpper =
          categoryNameTrim.charAt(0).toUpperCase() + categoryNameTrim.slice(1);
        const newCategory = await axios
          .post(`${process.env.REACT_APP_SERVER_URL}api/category`, {
            role: user.user_metadata.role,
            userId: user.username,
            categoryName: categoryNameToUpper,
            categoryDescription: categoryDesc.trim(),
          })
          .catch((error) => {
            window.alert("There was an error." + error);
            setCategoryName("");
            setCategoryDesc("");
            setSubmitDisabled(false);
            handleClose();
            return;
          });
        if (!newCategory) {
          return;
        }
        window.confirm("Category successfully created");
        props.fetchCategories();
        setCategoryName("");
        setCategoryDesc("");
        setSubmitDisabled(false);
        handleClose();
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  if (isAuthenticated) {
    if (user.user_metadata.role === "admin") {
      return (
        <>
          <Button className="btn-primary" onClick={handleShow}>
            Create a category
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div>
                  <Row>
                    <Col md={10}>
                      <div className="mt-4">
                        <Form.Label>Category Title</Form.Label>
                        <Form.Control
                          min="5"
                          max="30"
                          onChange={(e) => setCategoryName(e.target.value)}
                          type="text"
                          value={categoryName}
                          // keyboard={false}
                        />
                        <p className="text-danger">{categoryNameErrMessage}</p>
                        <Form.Text muted>
                          Your category title must be 5-30 characters long, and
                          contain letters and numbers.
                        </Form.Text>
                      </div>
                      <div className="mt-4">
                        <Form.Label>Category Description</Form.Label>
                        <Form.Control
                          onChange={(e) => setCategoryDesc(e.target.value)}
                          as="textarea"
                          rows={10}
                          value={categoryDesc}
                        />
                        <p className="text-danger">{categoryDescErrMessage}</p>
                        <Form.Text muted>
                          Please follow forum Terms of Service
                        </Form.Text>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={submitEnabled}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleSubmit}
                disabled={submitEnabled}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
};

export default CreateCategory;
