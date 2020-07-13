import React from "react";
import aaron from "../aaron.jpeg";
import nikki from "../nikki.jpeg";
import thomas from "../thomas.jpeg";
import chantelle from "../chantelle.jpeg";
import groupPhoto from "../StarSaleGroup.jpg";
import { Container } from "reactstrap";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [
        {
          imageURL: thomas,
          about:
            "I am originally from Oakland California but for the past few years I have been attending San Diego State down in Socal. I enjoy working with front-end applications because it gives me an opportunity to utilize coding to create experiences that let me connect with other people. My hobbies are Chess, Soccer, and competitive video games.",
        },
        {
          imageURL: aaron,
          about:
            "I'm a Full-Stack web-developer at LEARN academy and graduated with my BA in Information system management. I am currently working with languages on the front-end like Javascript, HTML, CSS and ruby.",
        },
        {
          imageURL: nikki,
          about:
            "Hi there! My name is Nikki Brooks. I am a recent graduate of a full stack web development bootcamp, eager to utilize my new skills. I am passionate about building amazing websites that influence and improve the lives of those around me. When im not coding i enjoy, skateboarding, and hanging out at the beach with my dog Archie.",
        },
        {
          imageURL: chantelle,
          about:
            "A move to San Diego gave me the opportunity to attend the (appropriately named) LEARN Academy where my world of learning has been expanded. Becoming a Full Stack Web Developer has allowed me to open the hood of the digital world we live in and see the engine inside - and it’s fascinating. I’d love to learn about your ideas, your projects, and how we can work together to make them a reality.",
        },
      ],
    };
  }

  render() {
    let data = this.state.info.map((value, index) => {
      return (
        <div key={index}>
          <div className="row">
            <div className="column-left">
              <img src={value.imageURL} className="profile-pic"></img>
            </div>
            <div className="column-middle">
              <p className="about-text">{value.about}</p>
            </div>
            <div className="column-right"></div>
          </div>
          {index !== 3 && <hr className="profile-border"></hr>}
        </div>
      );
    });
    return (
      <>
        <Container>
          <div className="group-photo">
            <img src={groupPhoto} width="700px" />
          </div>
          <p id="TEAM">
            We're Team TANC (Thomas, Aaron, Nikki, and Chantelle) from LEARN
            Academy's Bravo 2020 Cohort. We built StarSale as a full-stack
            application for our final capstone project.
          </p>
          {data}
        </Container>
      </>
    );
  }
}

export default About;
