import {React, useState, useEffect} from "react";
import {Table, Button, Form} from "react-bootstrap";
import {Link, useParams, useLocation} from "react-router-dom";
import "./postComponent.css";
import {useAuth0} from "@auth0/auth0-react";
import EditButton from "../../components/EditButton";
import axios from "axios";
import CreateComment from "../createComment/CreateComment";
import Moment from "react-moment";

function PostComponent() {
  const {user, isAuthenticated, loginWithRedirect} = useAuth0();
  const urlParam = useParams();
  const [postData, setPostData] = useState([]);
  const [postLoaded, setPostLoaded] = useState(false);
  const [commentsLoaded, setcommentsLoaded] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const post = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/post/${urlParam.id}`
    );
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
          <thead className="bg-violet">
            <tr>
              <th>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="me-3">{postData.userId}</div>
                    <div className="fw-light me-1">created/updated at:</div>
                    <Moment format="MM/DD/YYYY, h:mm:ss a" className="fw-light">
                      {postData.createdAt}
                    </Moment>
                  </div>
                  <div className="ms-5">
                    <EditButton edit="editcomment" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="">{postData.postBody}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  };

  const RenderComments = () => {
    if (!commentsLoaded) return;
    return commentsData.map((item) => {
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
                    <div className="fw-light me-1">created/updated at:</div>
                    <Moment format="MM/DD/YYYY, h:mm:ss a" className="fw-light">
                      {item.updatedAt}
                    </Moment>
                  </div>
                  <div className="ms-5">
                    <EditButton edit="editcomment" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="">{item.comment}</td>
            </tr>
          </tbody>
        </Table>
      );
    });
  };

  return (
    <>
      <RenderPost />
      <RenderComments />
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
          postId={postData.topicId}
        />
      )}
    </>
  );
}

export default PostComponent;
