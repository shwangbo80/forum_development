import React from "react";
import Profile from "../profile/Profile";
import { Row, Col, Button, Container, Image } from "react-bootstrap";
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

              <section className="text-center">
                <Container className="px-0">
                  <Row className="my-5 p-5">
                    <h2 className="text-darkBlue mb-5">Our Features</h2>
                    <Col>
                      <div>
                        <i
                          className="fa fa-comments fa-5x text-darkBlue mb-4"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <strong className="text-darkBlue">Forums</strong>
                      <p>
                        Participate in discussions on a wide range of topics,
                        from technology to sports to cooking.
                      </p>
                    </Col>
                    <Col>
                      <div>
                        <i
                          className="fa fa-users fa-5x text-danger mb-4"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <strong className="text-darkBlue">Community</strong>
                      <p>
                        Join a community of like-minded people and share your
                        ideas and knowledge.
                      </p>
                    </Col>
                    <Col>
                      <div>
                        <i
                          className="fa fa-question fa-5x text-success mb-4"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <strong className="text-darkBlue">Expertise</strong>
                      <p>
                        Connect with experts in your field and learn from their
                        experience.
                      </p>
                    </Col>
                  </Row>
                </Container>
                <Container className="px-0">
                  <section className="hero2 d-flex align-items-center mb-0">
                    <Row>
                      <Col></Col>
                      <Col md={8} className="">
                        <h2>
                          We offer a wide range of topics and categories to
                          choose from, including sports, music, movies,
                          technology, health, and more. Whether you're a fan of
                          a specific TV show or a professional in a certain
                          field, you'll find plenty of interesting discussions
                          to join and contribute to.
                        </h2>
                      </Col>
                      <Col></Col>
                    </Row>
                  </section>
                </Container>
                <Container>
                  <section className="my-5 p-5">
                    <Row className="d-flex align-items-center my-5">
                      <Col md1={6}>
                        <Image
                          fluid
                          className="img-rounded"
                          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80"
                        />
                      </Col>
                      <Col md={6}>
                        <h4 className="text-start p-5 lh-base text-darkBlue">
                          Our community is constantly growing and evolving, with
                          new members joining every day. By joining our forum,
                          you'll have the opportunity to connect with people
                          from all over the world and expand your knowledge and
                          horizons.
                        </h4>
                      </Col>
                    </Row>
                  </section>
                </Container>
              </section>
            </main>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeComponent;
