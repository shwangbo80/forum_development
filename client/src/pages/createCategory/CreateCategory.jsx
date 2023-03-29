import { React, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./createCategory.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  console.log(user);

  // create category
  const createCategory = async () => {
    if (!user) {
      setErrMessage("User info not found");
      return;
    } else if (!user.user_metadata.role) {
      setErrMessage("You are not admin");
      return;
    }
    await axios.post(`${process.env.REACT_APP_SERVER_URL}api/category`, {
      role: user.user_metadata.role,
      userId: user.sub,
      categoryName: categoryName,
      categoryDescription: categoryDescription,
    });
    const successMsg = alert("Category has been successfully created");
    if (!successMsg) {
      navigate(`/admin`);
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
        <h2 className="mb-5">Create Topic</h2>
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
              <Button onClick={createCategory}>Submit</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateCategory;
