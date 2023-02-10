import React from "react";
import {Container} from "react-bootstrap";
import "./main.css";
import {Outlet} from "react-router-dom";
import NavbarComponent from "../../components/navbar/NavbarComponent";

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
