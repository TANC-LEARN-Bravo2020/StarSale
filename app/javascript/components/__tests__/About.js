import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import About from "../pages/About";

Enzyme.configure({ adapter: new Adapter() });

describe("checks that there are 5 images", () => {
  it("renders images without crashing", () => {
    const wrapper = mount(<About />);
    expect(wrapper.find("img")).toHaveLength(5);
  });
});

it("About renders without ceashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About />, div);
});

it("Check team description", () => {
  const wrapper = mount(<About />);
  expect(wrapper.find("#TEAM").text()).toEqual(
    `We're Team TANC (Thomas, Aaron, Nikki, and Chantelle) from LEARN Academy's Bravo 2020 Cohort. We built StarSale as a full-stack application for our final capstone project.`
  );
});

describe("checks length of about-text", () => {
  it("should display 4 abouts", () => {
    const wrapper = mount(<About />);
    expect(wrapper.find(".about-text")).toHaveLength(4);
  });
});
