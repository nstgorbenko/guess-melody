import ErrorScreen from "./error-screen.jsx";

import React from "react";
import renderer from "react-test-renderer";

describe(`ErrorScreen Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <ErrorScreen />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
