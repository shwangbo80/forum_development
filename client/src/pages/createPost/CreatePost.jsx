import { React, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function CreatePost(props) {
  const { user } = useAuth0();
  let navigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [postBody, setPostBody] = useState("");
  const urlParam = useParams();
  const [postsLoaded, setpostsLoaded] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [postTitleErrMessage, setPostTitleErrMessage] = useState("");
  const [postBodyErrMessage, setPostBodyErrMessage] = useState("");
  const [submitEnabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const posts = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/topic/${urlParam.id}/posts`
    );
    setPostsData(posts.data);
    setpostsLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postsLoaded) {
      return;
    }

    if (postName.length < 5) {
      setPostTitleErrMessage("post name must be at least 5 characters");
      return;
    } else {
      setPostTitleErrMessage("");
    }

    if (postBody.length < 1) {
      setPostBodyErrMessage("post body must be at least 1 character");
      return;
    } else {
      setPostBodyErrMessage("");
    }

    if (postName.length >= 5 && postBody.length >= 1) {
      try {
        setSubmitDisabled(true);
        const newPost = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}api/post`,
          {
            userId: user.username,
            postId: postsData.length + 1,
            topicId: urlParam.id,
            postName: postName,
            postBody: postBody,
          }
        );
        console.log(newPost);
        return navigate(`../forums/topic/${urlParam.id}`);
      } catch (err) {
        window.alert(
          "There was an error posting. Sending you back to main page."
        );
        return navigate(`../`);
      }
    } else {
      return;
    }
  };

  if (!user) {
    return navigate(`../`);
  }

  return (
    <div className="p-5">
      <h2 className="mb-5">Create Post</h2>
      <Row>
        <Col md={10}>
          <div className="mt-4">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              min="5"
              max="30"
              onChange={(e) => setPostName(e.target.value)}
              type="text"
            />
            <p className="text-danger">{postTitleErrMessage}</p>
            <Form.Text muted>
              Your post title must be 5-30 characters long, and contain letters
              and numbers.
            </Form.Text>
          </div>
          <div className="mt-4">
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              onChange={(e) => setPostBody(e.target.value)}
              as="textarea"
              placeholder="Post body here"
              rows={10}
            />
            <p className="text-danger">{postBodyErrMessage}</p>
            <Form.Text muted>Please follow forum Terms of Service</Form.Text>
          </div>
          <div className="mt-5">
            <Button onClick={handleSubmit} disabled={submitEnabled}>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePost;
