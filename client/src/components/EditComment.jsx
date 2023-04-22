import { React, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditComment = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [commentBody, setCommentBody] = useState(props.commentBody);
  const [commentErrMessage, setCommentErrMessage] = useState("");
  const [submitEnabled, setSubmitDisabled] = useState(false);

  let navigate = useNavigate();
  console.log(props.postId);
  console.log(props.commentId);

  const handleSubmit = async (e) => {
    if (commentBody.length <= 0) {
      setCommentErrMessage("Comment must be at least 1 character");
      return;
    } else {
      setCommentErrMessage("");
    }
    if (commentBody.length >= 1) {
      try {
        setSubmitDisabled(true);
        const newComment = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}api/post/${props.postId}/comments/${props.commentId}`,
          {
            userId: user.username,
            comment: commentBody,
          }
        );
        props.fetchComments();
        handleClose();
        console.log(newComment);
        return navigate(`../forums/post/${props.postId}`);
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
        const deleteComents = await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}api/post/${props.postId}/comments/${props.commentId}`,
          {
            data: { userId: props.userId, role: user.user_metadata.role },
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
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div>
                  <Row>
                    <Col md={10}>
                      <Form onSubmit={handleSubmit}>
                        <div className="mt-4">
                          <Form.Label>Comment Body</Form.Label>
                          <Form.Control
                            onChange={(e) => setCommentBody(e.target.value)}
                            as="textarea"
                            placeholder="Comment body here"
                            rows={10}
                            value={commentBody}
                          />
                          <p className="text-danger">{commentErrMessage}</p>
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
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={submitEnabled}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={submitEnabled}
              >
                Save Changes
              </Button>
              <Button
                variant="danger"
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

export default EditComment;
