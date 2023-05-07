import { React, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const CreateTopic = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryId, setCategoryId] = useState("default");
  const [topicName, setTopicName] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const [categoryIdErrMessage, setCategoryIdErrMessage] = useState("");
  const [topicNameErrMessage, setTopicNameErrMessage] = useState("");
  const [topicDescErrMessage, setCategoryDescErrMessage] = useState("");
  const [submitEnabled, setSubmitDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryId == "default") {
      setCategoryIdErrMessage("You must select a category");
      return;
    } else {
      setCategoryIdErrMessage("");
    }
    if (topicName.length < 5) {
      setTopicNameErrMessage("Post name must be at least 5 characters");
      return;
    } else {
      setTopicNameErrMessage("");
    }
    if (topicDesc.length === 0) {
      setCategoryDescErrMessage("Post body must be at least 5 characters");
      return;
    } else {
      setCategoryDescErrMessage("");
    }

    if (
      categoryId != "default" &&
      topicName.length >= 5 &&
      topicDesc.length >= 1
    ) {
      try {
        setSubmitDisabled(true);
        const topicNameTrim = topicName.trim();
        const topicNameToUpper =
          topicNameTrim.charAt(0).toUpperCase() + topicNameTrim.slice(1);
        const newTopic = await axios
          .post(`${process.env.REACT_APP_SERVER_URL}api/topic`, {
            role: user.user_metadata.role,
            userId: user.username,
            categoryId: categoryId,
            topicName: topicNameToUpper,
            topicDescription: topicDesc.trim(),
          })
          .catch((error) => {
            window.alert("There was an error." + error);
            setCategoryId("default");
            setTopicName("");
            setTopicDesc("");
            setSubmitDisabled(false);
            handleClose();
            return;
          });
        if (!newTopic) {
          return;
        }
        window.confirm("Topic successfully created");
        props.fetchCategoryTopics();
        setTopicName("");
        setTopicDesc("");
        setCategoryId("default");
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

  const renderSubmitForm = () => {
    if (isAuthenticated) {
      if (user.user_metadata.role === "admin") {
        return (
          <>
            <Button className="btn-danger" onClick={handleShow}>
              Create a topic
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
                <Modal.Title>Create Topic</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <>
                  <div>
                    <Row>
                      <Col md={10}>
                        <div className="mt-4">
                          <div>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                setCategoryId(e.target.value);
                              }}
                              value={categoryId}
                            >
                              <option value="default">Select category</option>
                              {props.categoriesData.map((item) => {
                                return (
                                  <option value={item._id} key={item._id}>
                                    {item.categoryName}
                                  </option>
                                );
                              })}
                            </Form.Select>
                            <p className="text-danger">
                              {categoryIdErrMessage}
                            </p>
                          </div>
                          <div className="mt-4">
                            <Form.Label>Topic Name</Form.Label>
                            <Form.Control
                              min="5"
                              max="30"
                              onChange={(e) => setTopicName(e.target.value)}
                              type="text"
                              value={topicName}
                              // keyboard={false}
                            />
                            <p className="text-danger">{topicNameErrMessage}</p>
                            <Form.Text muted>
                              Your topic must be 5-30 characters long, and
                              contain letters and numbers.
                            </Form.Text>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Form.Label>Topic Description</Form.Label>
                          <Form.Control
                            onChange={(e) => setTopicDesc(e.target.value)}
                            as="textarea"
                            rows={10}
                            value={topicDesc}
                          />
                          <p className="text-danger">{topicDescErrMessage}</p>
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

  return renderSubmitForm();
};

export default CreateTopic;
