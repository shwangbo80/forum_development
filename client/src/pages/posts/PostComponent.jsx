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
  const postId = urlParam.id;
  const location = useLocation();
  const postData = location.state.data;

  const [commentsLoaded, setcommentsLoaded] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  console.log(user);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const comments = await axios.get(
      `http://localhost:8800/api/post/${postId}/comments`
    );
    setCommentsData(comments.data);
    setcommentsLoaded(true);
  };

  console.log(commentsData);

  const RenderComments = () => {
    if (!commentsLoaded) return;
    return commentsData.map((item) => {
      return (
        <Table responsive bordered className="tableContainer" key={item._id}>
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
      <RenderComments />
      <hr className="my-5" />
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
          to make comments.
        </p>
      ) : (
        <CreateComment fetchComments={fetchComments} postId={postId} />
      )}
    </>
  );
}

export default PostComponent;
