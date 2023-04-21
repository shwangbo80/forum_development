import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <Row>
      <Col></Col>
      <Col md={8}>
        <div className="p-5">
          <h2 className="text-center">[About namuweb]</h2>
          <br></br>
          <div className="homeTextContainer">
            <p className="homeText">
              namuweb is an online community forum that engages converstations
              in various topics
            </p>
            <p className="homeText">
              At this moment, the service is still in development and testing
              stage.
            </p>
            <p className="homeText">You can use Namu to:</p>
            <ul>
              <li>Search for topics of your interest</li>
              <li>Create new discussions in topics</li>
              <li>Freely discuss your opinions and engage in converstions</li>
            </ul>
            <p>
              Feel free to brouwse around various topics, or register to join
              conversations.
            </p>
            <br></br>
            <p>Planned, Designed, and Developed by Soo Hwangbo</p>
            <p>Tech Stack: React, MongoDB, Node Js</p>
          </div>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default About;
