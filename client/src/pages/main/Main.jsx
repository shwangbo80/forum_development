import React from "react";
import { Container } from "react-bootstrap";
import "./main.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";

function Main() {
  return (
    <>
      <Header />
      <NavbarComponent />
      <Container className="px-0 bg-light">
        <Outlet />
      </Container>
      <FooterComponent />
    </>
  );
}

export default Main;
