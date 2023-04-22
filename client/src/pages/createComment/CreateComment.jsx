import { React, useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./createComment.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";

function CreateComment({ fetchComments, postId, topicId }) {
  const { user } = useAuth0();
  const [commentBody, setCommentBody] = useState("");
  const navigate = useNavigate();
  const [submitEnabled, setSubmitDisabled] = useState(false);
  const [postCommentErrMessage, setPostCommentErrMessage] = useState("");

  const handleSubmitComment = async (e) => {
    if (commentBody.length <= 0) {
      setPostCommentErrMessage("Please write a comment before posting");
      return;
    } else setPostCommentErrMessage("");
    try {
      setSubmitDisabled(true);
      setCommentBody("");
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/post/${postId}/comments/`,
        {
          userId: user.username,
          comment: commentBody,
        }
      );
      navigate(`../forums/topic/${topicId}`);
      //   fetchComments();
    } catch (err) {
      console.log("There was an error: " + err);
    }
  };

  return (
    <>
      <div>
        <h4 className="mb-3">Post Comment</h4>
        <Row>
          <Col md={10}>
            <div>
              <Form.Control
                as="textarea"
                placeholder="Post comment here"
                rows={5}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                style={{ resize: "none" }}
              />
              <p className="text-danger">{postCommentErrMessage}</p>
              <Form.Text muted>Please follow forum Terms of Service</Form.Text>
            </div>
            <div className="mt-5">
              <Button onClick={handleSubmitComment} disabled={submitEnabled}>
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateComment;
