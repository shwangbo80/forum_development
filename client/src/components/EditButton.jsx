import {React, useState, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditButton = (props) => {
  const {user, isAuthenticated, isLoading} = useAuth0();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [postName, setPostName] = useState(props.postName);
  const [postBody, setPostBody] = useState(props.postBody);
  const [postTitleErrMessage, setPostTitleErrMessage] = useState("");
  const [postBodyErrMessage, setPostBodyErrMessage] = useState("");
  const urlParam = useParams();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    if (postName.length >= 5) {
      try {
        const newPost = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}`,
          {
            // role: props.user.user_metadata.role || null,
            userId: props.userId,
            postName: postName,
            postBody: postBody,
          }
        );
        handleClose();
        console.log(newPost);
        props.fetchPost();
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
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}`,
          {
            data: {role: "admin"},
          }
        );
        handleClose();
        return navigate(`../forums/topic/${props.topicId}`);
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
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div>
                  <Row>
                    <Col md={10}>
                      <Form onSubmit={handleSubmit}>
                        <div className="mt-4">
                          <Form.Label>Post Title</Form.Label>
                          <Form.Control
                            min="5"
                            max="30"
                            onChange={(e) => setPostName(e.target.value)}
                            type="text"
                            value={postName}
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
                      </Form>
                    </Col>
                  </Row>
                </div>
              </>{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
              <Button variant="danger" onClick={handleDelete}>
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
