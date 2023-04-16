import {React, useState, useEffect} from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

function CreatePost() {
  const {user} = useAuth0();
  let navigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [postBody, setPostBody] = useState("");
  const urlParam = useParams();
  const [postsLoaded, setpostsLoaded] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [postTitleErrMessage, setPostTitleErrMessage] = useState("");
  const [postBodyErrMessage, setPostBodyErrMessage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(postName.length);

  const fetchPosts = async () => {
    const posts = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/topic/${urlParam.id}/posts`
    );
    setPostsData(posts.data);
    setpostsLoaded(true);
  };

  const handleSubmit = async (e) => {
    if (!postsLoaded) {
      return;
    }

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
        console.log(err);
      }
    } else {
      return;
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
                  min="5"
                  max="30"
                  onChange={(e) => setPostName(e.target.value)}
                  type="text"
                />
                <p className="text-danger">{postTitleErrMessage}</p>
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
                />
                <p className="text-danger">{postBodyErrMessage}</p>
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
