import {React, useEffect, useState, useRef} from "react";
import {Table, Button, Nav} from "react-bootstrap";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Moment from "react-moment";
import {useAuth0} from "@auth0/auth0-react";
import ReactPaginate from "react-paginate";

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

  console.log(postsData.length);

  function Items({currentItems}) {
    console.log(currentItems);

    return (
      <>
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
          {currentItems.map((item, key) => {
            return (
              <tbody className="tbodyContainer" key={item._id}>
                <tr>
                  <td className="fw-lighter">
                    {postsData.indexOf(item) + 1}
                    {/* {key} */}
                    {/* need to add item number to backend */}
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
                  <td className="">{/* must include length of comments */}</td>
                  <td className="">
                    {/* <Moment format="MM/DD/YYYY"> */}
                    {/* must include date of most recent comment */}
                    {/* </Moment> */}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </>
    );
  }

  function PaginatedItems({itemsPerPage}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = postsData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(postsData.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % postsData.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
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
      <>
        <h2>{topicData.topicName}</h2>
        <p>{topicData.topicDescription}</p>
      </>
    );
  };

  const renderPosts = () => {
    if (postsData.length === 0) {
      return <p>No posts yet</p>;
    }
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
              <Link to={`../forums/createpost/${topicData._id}`}>
                <Button>Make a post</Button>
              </Link>
            </div>
          )}
        </div>
        <PaginatedItems itemsPerPage={20} />
        <div></div>
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
