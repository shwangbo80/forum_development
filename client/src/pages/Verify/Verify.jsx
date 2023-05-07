import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./verify.css";

const VerifyButton = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const RenderVerifyButton = () => {
    if (!user.email_verified) {
      return "Verified Email? Click here to activate";
    }
  };

  return (
    <div
      className="loginButton me-2"
      onClick={() => {
        loginWithRedirect();
      }}
    >
      <RenderVerifyButton />
    </div>
  );
};

export default VerifyButton;
