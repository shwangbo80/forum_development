import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import "./login.css";

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <p className="loginButton me-2 " onClick={() => loginWithRedirect()}>
      Log In
    </p>
  );
};

export default LoginButton;
