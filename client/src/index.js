import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    cacheLocation="localstorage"
    domain="dev-76tpsaxd8ybw870f.us.auth0.com"
    clientId="mmd1IH8ivO9SivxlVdzlyZH4bSL053Rj"
    useRefreshTokens={true}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
