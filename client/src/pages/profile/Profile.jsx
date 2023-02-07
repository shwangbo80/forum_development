import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {Container} from "react-bootstrap";
const Profile = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  return (
    isAuthenticated && (
      <div>
        <p className="text-end">Welcome {user.name}</p>
      </div>
    )
  );
};

export default Profile;
