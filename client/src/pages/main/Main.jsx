import React from "react";
import Profile from "../profile/Profile";
import {Container, Row, Col} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./main.css";
import {Outlet} from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import HomeComponent from "../home/HomeComponent";

function Main() {
  return (
    <>
      <NavbarComponent />
      <Container className="mainContainer p-5">
        <Outlet />
      </Container>
    </>
  );
}

export default Main;
