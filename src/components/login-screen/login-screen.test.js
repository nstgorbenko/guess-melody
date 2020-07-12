import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "./login-screen.jsx";

describe(`LoginScreen Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <LoginScreen
            onReplayButtonClick={() => {}}
            onSubmit={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
