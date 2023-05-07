import { React, useEffect, useState, useRef } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { useAuth0 } from "@auth0/auth0-react";
import ReactPaginate from "react-paginate";

function TopicComponent() {
  const [postsLoaded, setpostsLoaded] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [topicLoaded, setTopicLoaded] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const urlParam = useParams();

  useEffect(() => {
    fetchTopic();
    fetchPosts();
  }, []);

  function Items({ currentItems }) {
    return (
      <>
        <Table hover responsive>
          <thead className="bg-secondary text-light">
            <tr>
              <th className="numHead text-center">No</th>
              <th className="topicHead">Title</th>
              <th className="authorHead">Created By</th>
              <th className="commentsHead text-center">Comments</th>
              <th className="lastPostHead">Last Post</th>
            </tr>
          </thead>
          {currentItems.map((item, key) => {
            return (
              <tbody className="tbodyContainer" key={item._id}>
                <tr>
                  <td className="fw-lighter text-center">{item.postId}</td>
                  <td>
                    <Link to={`../forums/post/${item._id}`}>
                      {item.postName}
                    </Link>
                  </td>
                  <td className="fw-light">{item.userId}</td>
                  <td className="text-center">{item.comments.length}</td>
                  <td>
                    <Moment format="MM/DD/YYYY, h:mm:ss a">
                      {item.comments.length > 0
                        ? item.comments[item.comments.length - 1].createdAt
                        : item.createdAt}
                    </Moment>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = postsData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(postsData.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % postsData.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          className="pagination d-flex justify-content-center gap-2 mt-5"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={true}
          pageLinkClassName="pageLink"
          activeClassName="activeClass"
          activeLinkClassName="activeLinkClassName"
          previousLinkClassName="previousLinkClassName	"
          nextLinkClassName="nextLinkClassName"
        />
      </>
    );
  }

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
      setPostsData(posts.data.reverse());
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
      <div className="mb-5">
        <h2>{topicData.topicName}</h2>
        <p>{topicData.topicDescription}</p>
        {!isAuthenticated || user.email_verified === false ? (
          <p>
            Please{" "}
            <span
              className="text-primary fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                loginWithRedirect();
              }}
            >
              login
            </span>{" "}
            or verify Email to make comments.
          </p>
        ) : (
          <Link to={`../forums/createpost/${topicData._id}`}>
            <Button className="mb-3">Make a post</Button>
          </Link>
        )}
      </div>
    );
  };

  const renderPosts = () => {
    if (postsData.length === 0) {
      return (
        <>
          <p>No posts yet</p>
        </>
      );
    }
    if (!postsLoaded) {
      return <Spinner animation="border" variant="primary" />;
    }
    return (
      <>
        <PaginatedItems itemsPerPage={20} />
        <div></div>
      </>
    );
  };

  return (
    <div className="p-5">
      {renderTopic()}
      {renderPosts()}
    </div>
  );
}

export default TopicComponent;
