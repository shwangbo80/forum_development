import React, { useEffect } from "react";
import { Col, Row, Button, Form, Container } from "react-bootstrap";
import {
  Link,
  Outlet,
  Navigate,
  useNavigate,
  redirect,
} from "react-router-dom";
import "./admin.css";
import { useAuth0 } from "@auth0/auth0-react";
import CreateCategory from "../../components/CreateCategory";

function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!user) {
    redirect("/");
  } else if (user.user_metadata.role != "admin") {
    redirect("/");
  } else if (user.user_metadata.role === "admin") {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse bg-secondary"
            >
              <div className="position-sticky pt-5 sidebar-sticky text-light">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <span data-feather="home" className="align-text-bottom" />
                    <h5>Dashboard</h5>
                  </li>
                  <li className="nav-item">
                    <p>
                      <a className="text-light" href="admin">
                        Categories
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4  pb-5">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2 my-5">Admin Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0"></div>
              </div>
              <Outlet />
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
