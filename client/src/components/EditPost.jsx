import { React, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditButton = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [postName, setPostName] = useState(props.postName);
  const [postBody, setPostBody] = useState(props.postBody);
  const [postTitleErrMessage, setPostTitleErrMessage] = useState("");
  const [postBodyErrMessage, setPostBodyErrMessage] = useState("");
  const [submitEnabled, setSubmitDisabled] = useState(false);

  const urlParam = useParams();
  let navigate = useNavigate();

  console.log("post ID: " + props.postId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postName.length < 5) {
      setPostTitleErrMessage("post name must be at least 5 characters");
      return;
    } else {
      setPostTitleErrMessage("");
    }
    if (postBody.length === 0) {
      setPostBodyErrMessage("post body must be at least 5 characters");
      return;
    } else {
      setPostBodyErrMessage("");
    }
    if (postName.length >= 5 && postBody.length >= 1) {
      try {
        setSubmitDisabled(true);
        const newPost = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}`,
          {
            role: props.user.user_metadata.role || null,
            userId: props.userId,
            postName: postName,
            postBody: postBody,
          }
        );
        handleClose();
        console.log(newPost);
        return navigate(`../forums/topic/${props.topicId}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        setSubmitDisabled(true);
        async function deleteComments() {
          await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}/comments`,
            {
              data: { userId: props.userId },
            }
          );
        }
        async function deletePost() {
          await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}`,
            {
              data: { userId: props.userId },
            }
          );
        }
        deleteComments();
        deletePost();
        handleClose();
        return navigate(`../forums/categories`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isAuthenticated) {
    if (props.userId === user.username || user.user_metadata.role === "admin") {
      return (
        <>
          <Button variant="light btn-sm" onClick={handleShow}>
            Edit
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
              <Modal.Title>Edit post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div>
                  <Row>
                    <Col md={10}>
                      <div className="mt-4">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control
                          min="5"
                          max="30"
                          onChange={(e) => setPostName(e.target.value)}
                          type="text"
                          value={postName}
                          // keyboard={false}
                        />
                        <p className="text-danger">{postTitleErrMessage}</p>
                        <Form.Text muted>
                          Your post title must be 5-30 characters long, and
                          contain letters and numbers.
                        </Form.Text>
                      </div>
                      <div className="mt-4">
                        <Form.Label>Post Body</Form.Label>
                        <Form.Control
                          onChange={(e) => setPostBody(e.target.value)}
                          as="textarea"
                          placeholder="Post body here"
                          rows={10}
                          value={postBody}
                        />
                        <p className="text-danger">{postBodyErrMessage}</p>
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
              <Button
                variant="danger"
                type="button"
                onClick={handleDelete}
                disabled={submitEnabled}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
};

export default EditButton;
