import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import "./profile.css";

const Profile = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  if (!isAuthenticated) {
    return (
      <div className="profileContainer p-3">
        <p>Login to view your profile</p>
      </div>
    );
  } else if (!user.email_verified) {
    return (
      <div className="profileContainer p-3">
        <p>Please verify your email before login and posting.</p>
      </div>
    );
  } else {
    return (
      isAuthenticated && (
        <div className="profileContainer p-3">
          <p>Welcome {user.username}</p>
        </div>
      )
    );
  }
};

export default Profile;
