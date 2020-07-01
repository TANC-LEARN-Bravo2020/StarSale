import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AllSales from "../AllSales";
Enzyme.configure({ adapter: new Adapter() });

it("it tests if were importing data", () => {
  const component = mount(<AllSales />);
  expect(this.State.AllSales).toBeGreaterThanOrEqual(2);
});

it("renders content hi", () => {
  const component = mount(<AllSales />);
  let element = document.getElementById("hello");
  expect(element).toEqual("hi");
});
