import {React, useState, useEffect} from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useLocation, redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

function CreatePost() {
  const {user} = useAuth0();
  const location = useLocation();
  let navigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [postBody, setPostBody] = useState("");
  const urlParam = useParams();

  const handleSubmit = async (e) => {
    try {
      const newPost = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/post`,
        {
          userId: user.username,
          topicId: urlParam.id,
          postName: postName,
          postBody: postBody,
        }
      );
      console.log(newPost);
      return navigate(`../forums/topic/${urlParam.id}`);
    } catch (err) {
      console.log("There was an error, " + err);
    }
  };

  return (
    <>
      <div>
        <h2 className="mb-5">Create Post</h2>
        <Row>
          <Col md={10}>
            <Form onSubmit={handleSubmit}>
              <div className="mt-4">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  onChange={(e) => setPostName(e.target.value)}
                  type="text"
                  aria-describedby="passwordHelpBlock"
                />
                <Form.Text muted>
                  Your post title must be 5-30 characters long, and contain
                  letters and numbers.
                </Form.Text>
              </div>
              <div className="mt-4">
                <Form.Label>Post Body</Form.Label>
                <Form.Control
                  onChange={(e) => setPostBody(e.target.value)}
                  as="textarea"
                  placeholder="Post body here"
                  rows={10}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && e.shiftKey === false) {
                      handleSubmit();
                    }
                  }}
                />
                <Form.Text muted>
                  Please follow forum Terms of Service
                </Form.Text>
              </div>
              <div className="mt-5">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreatePost;
