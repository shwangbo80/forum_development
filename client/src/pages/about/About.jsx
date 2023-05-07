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
              <h4>Overview</h4>
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
              <h4 className="mt-5">Benefits</h4>
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
              <h4 className="mt-5">About Soo Hwangbo</h4>
              <p>
                Hi there! My name is Soo Hwangbo, and I am the developer behind
                this forum website. I have always been passionate about creating
                digital products that bring people together, and this forum is
                no exception. With over 5 years of experience in web
                development, I have the skills and expertise to create websites
                that are not only functional and easy to use, but also visually
                appealing and engaging. I believe that the user experience is
                key, and I strive to create websites that are both intuitive and
                enjoyable to navigate.
              </p>
              <p>
                When I set out to create this forum, my goal was to build a
                platform that would foster meaningful conversations and
                connections among people from all walks of life. I wanted to
                create a space where people could come together to learn, grow,
                and share their ideas and experiences with each other. But
                building a forum is not just about the technical aspects of web
                development. It's also about understanding the needs and wants
                of the community you are serving. That's why I have made it a
                priority to listen to the feedback of our members and make
                changes accordingly. Your input is crucial to the success of
                this forum, and I am committed to making it the best platform it
                can be.
              </p>
              <p>
                Thank you for visiting our forum website, and I hope you will
                join us in our mission to build a vibrant and inclusive
                community. If you have any questions or feedback, please don't
                hesitate to reach out to me directly. I look forward to hearing
                from you!
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
