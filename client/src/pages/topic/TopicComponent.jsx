import {React, useEffect, useState} from "react";
import {Row, Col, Table, Button} from "react-bootstrap";
import axios from "axios";
import {Link, useParams, useLocation} from "react-router-dom";
import Moment from "react-moment";
import {useAuth0} from "@auth0/auth0-react";

function TopicComponent() {
  const [postsLoaded, setpostsLoaded] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const {user, isAuthenticated, loginWithRedirect} = useAuth0();

  const location = useLocation();
  const {id} = location.state;
  const urlParam = useParams();
  const categoryName = location.state.categoryName;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const posts = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/topic/${id}/posts`
    );
    setPostsData(posts.data);
    setpostsLoaded(true);
  };

  console.log(postsData);

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
            <div className="mb-4">
              <Link to="../forums/createpost">
                <Button>Make a post</Button>
              </Link>
            </div>
          )}
        </div>
        <Table hover responsive>
          <thead className="bg-secondary text-light">
            <tr>
              <th className="numHead">No</th>
              <th className="topicHead">Topic</th>
              <th className="authorHead">Created By</th>
              <th className="commentsHead">Comments</th>
              <th className="lastPostHead">Last Post</th>
            </tr>
          </thead>
          <tbody className="tbodyContainer">
            <tr>
              <td className="">3</td>
              <td className="">
                <Link
                  to={`../forums/post/${postsData[0]._id}`}
                  state={{data: postsData[0]}}>
                  {postsData[0].postName}
                </Link>
              </td>
              <td className="">{postsData[0].userId}</td>
              <td className="">{postsData.length - 1}</td>
              <td className="">
                <Moment format="MM/DD/YYYY">{postsData[0].updatedAt}</Moment>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  };

  return (
    <div>
      <h2>{urlParam.name}</h2>
      <p>{categoryName}</p>
      {renderPosts()}
    </div>
  );
}

export default TopicComponent;
