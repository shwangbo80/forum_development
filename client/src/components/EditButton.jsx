import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Dropdown, DropdownButton} from "react-bootstrap";

const EditButton = (props) => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isAuthenticated) {
    if (isLoading) {
      return;
    } else {
      if (!user.user_metadata.role) {
        return (
          <div className="text-center">
            <DropdownButton
              key="down-centered"
              id="dropdown-button-drop-down-centered"
              drop="right"
              variant="primary"
              size="sm"
              title="">
              <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
            </DropdownButton>
          </div>
        );
      } else if (user.user_metadata.role === "admin") {
        return (
          <div className="text-center">
            <DropdownButton
              key="down-centered"
              id="dropdown-button-drop-down-centered"
              drop="right"
              variant="primary"
              size="sm"
              title="">
              {/* <Link to="./forum/editpost"> */}
              <Dropdown.Item eventKey="1" href={`../forums/${props.edit}`}>
                Edit
              </Dropdown.Item>
              {/* </Link> */}
              <Dropdown.Item eventKey="2">Review</Dropdown.Item>
              <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
            </DropdownButton>
          </div>
        );
      }
    }
  }
};

export default EditButton;
