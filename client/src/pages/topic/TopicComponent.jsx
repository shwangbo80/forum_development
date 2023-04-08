import {React, useEffect, useState, useRef} from "react";
import {Row, Col, Table, Button} from "react-bootstrap";
import axios from "axios";
import {Link, useParams, useLocation} from "react-router-dom";
import Moment from "react-moment";
import {useAuth0} from "@auth0/auth0-react";

function TopicComponent() {
  const [postsLoaded, setpostsLoaded] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [topicLoaded, setTopicLoaded] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const {user, isAuthenticated, loginWithRedirect} = useAuth0();

  const urlParam = useParams();

  useEffect(() => {
    fetchTopic();
    fetchPosts();
  }, []);

  const fetchTopic = async () => {
    try {
      const category = await axios.get(
        `http://localhost:8800/api/topic/${urlParam.id}`
      );
      setTopicData(category.data);
      setTopicLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const posts = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/topic/${urlParam.id}/posts`
      );
      setPostsData(posts.data);
      setpostsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const renderTopic = () => {
    if (!topicLoaded) {
      return;
    }
    return (
      <>
        <h2>{topicData.topicName}</h2>
        <p>{topicData.topicDescription}</p>
      </>
    );
  };

  const renderPosts = () => {
    if (!postsLoaded) {
      return;
    }
    return (
      <>
        <div>
          {!isAuthenticated ? (
            <p>
              Please{" "}
              <span
                className="text-primary fw-bold"
                style={{cursor: "pointer"}}
                onClick={() => {
                  loginWithRedirect();
                }}>
                login
              </span>{" "}
              to make posts.
            </p>
          ) : (
            <div className="mt-5 mb-4">
              <Link to="../forums/createpost" state={{data: urlParam}}>
                <Button>Make a post</Button>
              </Link>
            </div>
          )}
        </div>
        <Table hover responsive>
          <thead className="bg-secondary text-light">
            <tr>
              <th className="numHead">No</th>
              <th className="topicHead">Title</th>
              <th className="authorHead">Created By</th>
              <th className="commentsHead">Comments</th>
              <th className="lastPostHead">Last Post</th>
            </tr>
          </thead>
          {postsData
            .map((item, key) => {
              return (
                <tbody className="tbodyContainer" key={item._id}>
                  <tr>
                    <td className="fw-lighter">
                      {postsData.indexOf(item) + 1}
                    </td>
                    <td className="">
                      <Link
                        to={`../forums/post/${item._id}`}
                        //   state={{data: item}}
                      >
                        {item.postName}
                      </Link>
                    </td>
                    <td className="fw-light">{item.userId}</td>
                    <td className="">
                      {/* must include length of comments */}
                    </td>
                    <td className="">
                      {/* <Moment format="MM/DD/YYYY"> */}
                      {/* must include date of most recent comment */}
                      {/* </Moment> */}
                    </td>
                  </tr>
                </tbody>
              );
            })
            .reverse()}
        </Table>
      </>
    );
  };

  return (
    <div>
      {renderTopic()}
      {renderPosts()}
    </div>
  );
}

export default TopicComponent;
