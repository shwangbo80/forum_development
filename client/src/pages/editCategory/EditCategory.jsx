import {React, useEffect, useState} from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useParams, useResolvedPath, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

function EditCategory() {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState([]);
  const {user, isAuthenticated, isLoading} = useAuth0();
  const [errMessage, setErrMessage] = useState("");
  const urlParam = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
  });

  console.log(user.user_metadata.role);

  // get simgle category
  const fetchCategory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/category/${urlParam.id}`
    );
    setCategoryName(response.data.categoryName);
    setCategoryDescription(response.data.categoryDescription);
  };

  // edit single category
  const editCategory = async () => {
    if (!user) {
      setErrMessage("Admin info not found");
      return;
    } else if (!user.user_metadata.role) {
      setErrMessage("You are not admin");
      return;
    }
    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}api/category/${urlParam.id}`,
      {
        role: user.user_metadata.role,
        categoryName: categoryName,
        categoryDescription: categoryDescription,
      }
    );
    const successMsg = alert("Category has been successfully updated");
    if (!successMsg) {
      navigate(`/admin`);
    }
  };

  //delete single cateogry
  const deleteCategory = async () => {
    if (!user) {
      setErrMessage("User info not found");
      return;
    } else if (!user.user_metadata.role) {
      setErrMessage("You are not admin");
      return;
    }

    const deleteConfirm = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (deleteConfirm) {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}api/category/${urlParam.id}`,
        {data: {role: user.user_metadata.role}}
      );
      const successMsg = alert("Category has been successfully deleted");
      if (!successMsg) {
        navigate(`/admin`);
      }
    }
  };

  //handle name change
  const handleNameChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

  //handle description change
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setCategoryDescription(e.target.value);
  };

  return (
    <>
      <div>
        <h2 className="mb-5">Edit Topic</h2>
        {/* <p>{urlParam.id}</p> */}
        <Row>
          <Col md={10}>
            <div>
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit topic title here"
                value={categoryName}
                onChange={handleNameChange}
              />
            </div>
            <div className="mt-4">
              <Form.Label>Topic Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit topic description here"
                value={categoryDescription}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mt-4">
              <p className="text-danger">{errMessage}</p>
            </div>
            <div className="mt-5">
              <Button onClick={deleteCategory} className="btn-danger me-3">
                Delete
              </Button>
              <Button onClick={editCategory}>Submit</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditCategory;
