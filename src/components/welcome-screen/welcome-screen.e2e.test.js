import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Welcome Button working test`, () => {
  it(`Welcome Button should be pressed`, () => {
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
