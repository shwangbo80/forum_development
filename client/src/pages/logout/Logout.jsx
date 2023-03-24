import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./logout.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <p
      className="logoutButton btn-light"
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.removeItem("user");
      }}
    >
      Log Out
    </p>
  );
};

export default LogoutButton;
