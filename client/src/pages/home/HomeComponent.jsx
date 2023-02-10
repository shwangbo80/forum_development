import React from "react";
import Profile from "../profile/Profile";
import {Row, Col, Button} from "react-bootstrap";
import "./home.css";

function HomeComponent() {
  return (
    <Row>
      <Col md={9}>
        <div className="welcomeContainer p-5">
          <h2 className="text-center">[Welcome to namuweb]</h2>
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

            <div className="d-flex justify-content-center">
              <Button className="me-1" variant="outline-dark">
                Login
              </Button>
              <Button className="ms-1" variant="outline-dark">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col>
        <Profile />
      </Col>
    </Row>
  );
}

export default HomeComponent;
