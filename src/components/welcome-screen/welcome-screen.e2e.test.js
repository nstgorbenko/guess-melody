import WelcomeScreen from "./welcome-screen.jsx";

import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`WelcomeScreen working test`, () => {
  it(`presses welcome button`, () => {
    const onWelcomeButtonClick = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsCount = {3}
          onWelcomeButtonClick = {onWelcomeButtonClick}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);

    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalledTimes(1);
  });
});
