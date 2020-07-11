import React from "react";
import renderer from "react-test-renderer";
import ErrorScreen from "./error-screen.jsx";

describe(`ErrorScreen Component rendering`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<ErrorScreen />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
