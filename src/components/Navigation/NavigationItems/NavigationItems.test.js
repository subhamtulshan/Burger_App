import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./Navigationtem/NavigationItem";

configure({ adapter: new Adapter() });

describe("NavigationItems", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems></NavigationItems>);
  });
  it("should render two navigationItem if not Authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("should render three navigationItem if  Authenticated", () => {
    // const wrapper=shallow(<NavigationItems isAuthenticated></NavigationItems>);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("should render  navigationItem if  Authenticated", () => {
    // const wrapper=shallow(<NavigationItems isAuthenticated></NavigationItems>);
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
