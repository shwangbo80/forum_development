import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {Button} from "react-bootstrap";
import "./logout.css";

const LogoutButton = () => {
  const {logout} = useAuth0();

  return (
    <p
      className="logoutButton btn-light"
      //   variant="outline-primary"
      //   size="sm"
      onClick={() =>
        logout({logoutParams: {returnTo: window.location.origin}})
      }>
      Log Out
    </p>
  );
};

export default LogoutButton;
