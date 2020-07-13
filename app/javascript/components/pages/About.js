import React from "react";
import aaron from "../aaron.jpeg"
import nikki from "../nikki.jpeg"
import thomas from "../thomas.jpeg"
import chantelle from "../chantelle.jpeg"
import groupPhoto from "../StarSaleGroup.jpg"
import githubLogo from "../github.png"
import linkedinLogo from "../linkedin.png"
import {Container } from 'reactstrap'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [{
        imageURL: thomas,
        about: "Hello, My name is Thomas Gonda.  I am originally from Oakland, California but for the past few years I have been attending San Diego State down in Socal. I enjoy working with front-end applications because it gives me an opportunity to utilize coding to create experiences that let me connect with other people. My hobbies are Chess, Soccer, and competitive video games.",
        linkedin: "https://www.linkedin.com/in/thomasgonda3/",
        github: "https://github.com/thomasgonda3"
      },
      {
        imageURL: aaron,
        about: "My name is Aaron Masanes, and I am a Full-Stack web-developer at LEARN academy and graduated with my BA in Information system management. I am currently working with languages on the front-end like Javascript, HTML, CSS and ruby.",
        linkedin: "https://www.linkedin.com/in/aaron-masanes/",
        github: "https://github.com/masanes"
      },
      {
        imageURL: nikki,
        about: "Hi there! My name is Nikki Brooks. I am a recent graduate of a full stack web development bootcamp, eager to utilize my new skills. I am passionate about building amazing websites that influence and improve the lives of those around me. When im not coding i enjoy, skateboarding, and hanging out at the beach with my dog Archie.",
        linkedin: "https://www.linkedin.com/in/nicole-brooks89/",
        github: "https://github.com/nbrooks89"
      },
      {
        imageURL: chantelle,
        about: "A move to San Diego gave me the opportunity to attend the (appropriately named) LEARN Academy where my world of learning has been expanded. Becoming a Full Stack Web Developer has allowed me to open the hood of the digital world we live in and see the engine inside - and it’s fascinating. I’d love to learn about your ideas, your projects, and how we can work together to make them a reality.",
        linkedin: "https://www.linkedin.com/in/chantellerisaacs/",
        github: "https://github.com/chantelle-isaacs"
      }]
    };
  }

  render() {

    let data = this.state.info.map((value, index) =>  {
      return (
        <div key={index}>
          <div className="row">
            <div className="column-left">
              <img src={value.imageURL} className="profile-pic"></img>
            </div>
            <div className="column-middle">
              <p className="about-text">{value.about}</p>
            </div>
            <div className="column-right">
              <a href={value.linkedin}>
                <img className="developer-links" src={linkedinLogo} width="70px" height="70px"></img>
              </a>
              <a href={value.github}>
                <img className="developer-links" src={githubLogo} width="70px" height="70px"></img>
              </a>
            </div>
          </div>
          {index !== 3 &&
          <hr className="profile-border"></hr>
          }
        </div>
      )
    })
    return (
      <>
      <Container>
      <div className="group-photo">
        <img src={groupPhoto} width="700px" />
      </div>
      <p>We're Team TANC (Thomas, Aaron, Nikki, and Chantelle) from LEARN Academy's Bravo 2020 Cohort. We built StarSale as a full-stack application for our final capstone project.</p>
        {data}
      </Container>
      </>
    );
  }
}

export default About;
