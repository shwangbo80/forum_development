import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Verify from "../Verify/Verify";
import "./profile.css";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-3 text-end">
        <p>Login to view your profile</p>
      </div>
    );
  } else if (!user.email_verified) {
    return (
      <div className="text-end pt-3">
        <p>Please verify your email before login and posting.</p>
        <Button>
          <Verify />
        </Button>
      </div>
    );
  } else {
    return (
      isAuthenticated && (
        <div className="text-end pt-3">
          <p>Welcome {user.username}</p>
        </div>
      )
    );
  }
};

export default Profile;
