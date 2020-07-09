import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [{
        imageURL: "https://media-exp1.licdn.com/dms/image/C5603AQFT92J1gx5yuQ/profile-displayphoto-shrink_400_400/0?e=1599696000&v=beta&t=n9ehwlNLvrnS_zJz7PQ076VBfiM9Dh2KXPKKWVcUU-Q",
        about: "I am originally from Oakland California but for the past few years I have been attending San Diego State down in Socal. I enjoy working with front-end applications because it gives me an opportunity to utilize coding to create experiences that let me connect with other people. My hobbies are Chess, Soccer, and competitive video games."
      },
      {
        imageURL: "https://files.slack.com/files-pri/T04B40L2C-F016SU0GNBX/image.png",
        about: "I'm a Full-Stack web-developer at LEARN academy and graduated with my BA in Information system management. I am currently working with languages on the front-end like Javascript, HTML, CSS and ruby."
      },
      {
        imageURL: "https://media-exp1.licdn.com/dms/image/C4E03AQEEGrngZav1DQ/profile-displayphoto-shrink_200_200/0?e=1599696000&v=beta&t=yRLAgpLtai9GvCdNNizQL2yn5FgIRxLXqiRV8Gzb_jc",
        about: "Hi there! My name is Nikki Brooks. I am a recent graduate of a full stack web development bootcamp, eager to utilize my new skills. I am passionate about building amazing websites that influence and improve the lives of those around me. When im not coding i enjoy, skateboarding, and hanging out at the beach with my dog Archie."
      },
      {
        imageURL: "https://media-exp1.licdn.com/dms/image/C4E03AQElmpe96gkOWQ/profile-displayphoto-shrink_400_400/0?e=1599696000&v=beta&t=o_svEpJrM-zLe-WCypA8czAK2T39jVVqiry9_nK-1wo",
        about: "A move to San Diego gave me the opportunity to attend the (appropriately named) LEARN Academy where my world of learning has been expanded. Becoming a Full Stack Web Developer has allowed me to open the hood of the digital world we live in and see the engine inside - and it’s fascinating. I’d love to learn about your ideas, your projects, and how we can work together to make them a reality."
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
            <div className="column-right"></div>
          </div>
          {index !== 3 &&
          <hr className="profile-border"></hr>
          }
        </div>
      )
    })
    return (
      <>
        <h3>Lorem ipsum dolor sit amet, pertinax consequat conclusionemque eam at, at aeterno facilisi recteque nam. Mei te veri sonet appellantur, sed erant nusquam praesent no, quas eleifend cum ei. Te nominavi oportere splendide eos, ius equidem intellegat neglegentur an. Noster petentium explicari his ut. Id epicuri delicatissimi sed, ne placerat similique pri, no soluta percipit apeirian his.</h3>
        {data}
      </>
    );
  }
}

export default About;
