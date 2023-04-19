import {React, useState, useEffect} from "react";
import {Table, Spinner} from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import "./postComponent.css";
import {useAuth0} from "@auth0/auth0-react";
import EditPost from "../../components/EditPost";
import axios from "axios";
import CreateComment from "../createComment/CreateComment";
import Moment from "react-moment";
import ReactPaginate from "react-paginate";
import EditComment from "../../components/EditComment";

function PostComponent() {
  const {user, isAuthenticated, loginWithRedirect} = useAuth0();
  const urlParam = useParams();
  const [postData, setPostData] = useState([]);
  const [postLoaded, setPostLoaded] = useState(false);
  const [commentsLoaded, setcommentsLoaded] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  console.log(postData);

  //Paginate start

  function Items({currentItems}) {
    return currentItems.reverse().map((item) => {
      return (
        <Table
          responsive
          bordered
          className="tableContainer mt-2"
          key={item._id}>
          <thead className="bg-violet">
            <tr>
              <th>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="me-3">{item.userId}</div>
                    <div className="fw-light me-1">created at:</div>
                    <Moment format="MM/DD/YYYY, h:mm:ss a" className="fw-light">
                      {item.createdAt}
                    </Moment>
                    <div className="fw-light ms-3 me-1">updated at:</div>
                    <Moment format="MM/DD/YYYY, h:mm:ss a" className="fw-light">
                      {item.updatedAt}
                    </Moment>
                  </div>
                  <div className="ms-5">
                    <EditComment
                      edit="editcomment"
                      fetchComments={fetchComments}
                      userId={item.userId}
                      topicId={postData.topicId}
                      postId={postData._id}
                      commentId={item._id}
                      commentBody={item.comment}
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="commentArea">{item.comment}</td>
            </tr>
          </tbody>
        </Table>
      );
    });
  }

  function PaginatedItems({itemsPerPage}) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = commentsData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(commentsData.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % commentsData.length;
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
          previousLinkClassName="previousLinkClassName"
          nextLinkClassName="nextLinkClassName"
        />
      </>
    );
  }

  //Paginate end

  const fetchPost = async () => {
    const post = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}`
    );
    if (!post.data) {
      return navigate(`../forums/categories`);
    }
    setPostData(post.data);
    setPostLoaded(true);
  };

  const fetchComments = async () => {
    const comments = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}/comments`
    );
    setCommentsData(comments.data);
    setcommentsLoaded(true);
  };

  const RenderPost = () => {
    if (!postLoaded) {
      return;
    }
    return (
      <>
        <div>
          <h2 className="mb-4">{postData.postName}</h2>
        </div>
        <Table responsive bordered className="tableContainer">
          <thead className="bg-primary text-light">
            <tr>
              <th>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="me-3">{postData.userId}</div>
                    <div className="fw-light me-1">created at:</div>
                    <Moment format="MM/DD/YYYY, h:mm:ss a" className="fw-light">
                      {postData.createdAt}
                    </Moment>
                    <div className="fw-light ms-3 me-1">updated at:</div>
                    <Moment format="MM/DD/YYYY, h:mm:ss a" className="fw-light">
                      {postData.updatedAt}
                    </Moment>
                  </div>
                  <div className="ms-5">
                    <EditPost
                      edit="editcomment"
                      user={user}
                      postName={postData.postName}
                      postId={postData._id}
                      postBody={postData.postBody}
                      userId={postData.userId}
                      topicId={postData.topicId}
                      fetchPost={fetchPost}
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="postArea">{postData.postBody}</td>
            </tr>
          </tbody>
        </Table>
        <RenderComments />
      </>
    );
  };

  const RenderComments = () => {
    if (!commentsLoaded) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      );
    }
    if (commentsData.length === 0) {
      return <p className="mt-5">No comments. Be the first to comment</p>;
    }
    return (
      <div className="mt-5">
        <h6>Comments</h6>
        <PaginatedItems itemsPerPage={20} />
      </div>
    );
  };

  return (
    <>
      <RenderPost />
      {/* <PaginatedItems itemsPerPage={10} /> */}
      <hr
        className="my-5"
        style={{border: "none", borderBottom: "2px solid #000"}}
      />
      {!postLoaded ? (
        <div></div>
      ) : !isAuthenticated ? (
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
          to make comments.
        </p>
      ) : (
        <CreateComment
          fetchComments={fetchComments}
          topicId={postData.topicId}
          postId={urlParam.id}
        />
      )}
    </>
  );
}

export default PostComponent;
