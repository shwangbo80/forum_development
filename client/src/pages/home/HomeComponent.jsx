import React from "react";
import Profile from "../profile/Profile";
import { Row, Col, Button, Container } from "react-bootstrap";
import "./home.css";
import { useAuth0 } from "@auth0/auth0-react";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import LoginButton from "../login/Login";
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
      <div>
        <Row className="">
          <Col>
            <main>
              <section className="hero">
                <div className="container">
                  <h1>Welcome to Community Forum</h1>
                  <p>
                    Join our community and start sharing your ideas and
                    knowledge with others. Ask questions, get answers, and
                    participate in discussions on a wide range of topics.
                  </p>
                  <Button className="btn-light">
                    <Link to={"forums/categories"} className="btn">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </section>
              <section className="features my-5">
                <div className="container">
                  <h2>Our Features</h2>
                  <ul>
                    <li>
                      <strong>Forums:</strong> Participate in discussions on a
                      wide range of topics, from technology to sports to
                      cooking.
                    </li>
                    <li>
                      <strong>Blog:</strong> Read and write blog posts on topics
                      that interest you.
                    </li>
                    <li>
                      <strong>Community:</strong> Join a community of
                      like-minded people and share your ideas and knowledge.
                    </li>
                    <li>
                      <strong>Expertise:</strong> Connect with experts in your
                      field and learn from their experience.
                    </li>
                  </ul>
                </div>
              </section>
            </main>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeComponent;
