import WelcomeScreen from "./welcome-screen.jsx";

import React from "react";
import renderer from "react-test-renderer";

describe(`WelcomeScreen Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <WelcomeScreen
            errorsCount = {3}
            onWelcomeButtonClick = {() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
