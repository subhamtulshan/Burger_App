import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";

configure({ adapter: new Adapter() });

describe("BurgerBuilder", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onsetIngredient={()=>{}}></BurgerBuilder>);
  });
  it("should have the cuildcontrols if ings is true", () => {
    wrapper.setProps({ings:{salad:1}})
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
