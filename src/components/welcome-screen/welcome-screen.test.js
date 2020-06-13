import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

describe(`WelcomeScreen Component rendering`, () => {
  it(`WelcomeScreen Component should render correctly`, () => {
    const tree = renderer
      .create(
          <WelcomeScreen
            errorsCount = {3}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
