import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <Row>
      <Col></Col>
      <Col md={8}>
        <div className="p-5">
          <br></br>
          <div className="homeTextContainer">
            <div className="homeText">
              <h1 className="mb-5">Community Forum</h1>
              <h2>Overview</h2>
              <p>
                This Community Forum Application is a web-based forum platform
                that allows users to create and participate in discussions.
                Built using the MERN stack, the application provides a
                centralized platform for users to share knowledge, ask
                questions, and engage in meaningful conversations. Its
                user-friendly interface and support for rich text formatting,
                images, and video make it an ideal tool for businesses,
                educational institutions, or online communities looking to build
                a knowledge-sharing platform.
              </p>
              <h2>Benefits</h2>
              <p className="fw-bold mb-0">
                Centralized platform for knowledge sharing
              </p>
              <p>
                The application provides a centralized platform for users to
                share knowledge, ask questions, and engage in meaningful
                conversations.
              </p>
              <p className="fw-bold mb-0">Community building</p>
              <p>
                The application fosters a sense of community by allowing users
                to interact with each other, share experiences, and learn from
                one another. Scalable and customizable: The application is built
                using the MERN stack, which makes it easy to scale and customize
                based on the needs of the users.
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default About;
