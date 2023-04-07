import {React, useState} from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import "./createComment.css";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

function CreateComment({fetchComments, postId}) {
  const {user} = useAuth0();
  const [commentBody, setCommentBody] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await axios.post("http://localhost:8800/api/comment", {
        userId: user.username,
        postId: postId,
        comment: commentBody,
      });
      console.log(newComment);
      fetchComments();
    } catch (error) {
      console.log("There was an error " + error);
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
                onChange={(e) => setCommentBody(e.target.value)}
              />
              <Form.Text muted>Please follow forum Terms of Service</Form.Text>
            </div>
            <div className="mt-5">
              <Button onClick={handleSubmitComment}>Submit</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateComment;
