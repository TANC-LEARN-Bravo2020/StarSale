import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Footer from "../pages/Footer";
import { BrowserRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("About", () => {
  it("renders without crashing", () => {
    const wrapper = mount(
      <Router>
        <Footer />
      </Router>
    );
    expect(wrapper.find("footer")).toHaveLength(1);
  });
});
