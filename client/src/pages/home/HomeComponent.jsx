import React from "react";
import Profile from "../profile/Profile";
import { Row, Col, Button, Container } from "react-bootstrap";
import "./home.css";
import { useAuth0 } from "@auth0/auth0-react";
import Banner from "../../components/Banner";
function HomeComponent() {
  const { user, isAuthenticated } = useAuth0();

  const emailVerification = () => {
    try {
      if (!user.email_verified) {
        return <p>Please verify your email before login and posting.</p>;
      } else {
        return <div></div>;
      }
    } catch {
      return;
    }
  };

  return (
    <>
      <Banner />
      <div>
        <Row className="m-5">
          <Col md={9}>
            <div className="welcomeContainer">
              <h2 className="text-center">[Welcome to namuweb]</h2>
            </div>
          </Col>
          <Col>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeComponent;
