import Mistakes from "./mistakes.jsx";

import React from "react";
import renderer from "react-test-renderer";

describe(`Mistakes Component rendering`, () => {
  it(`renders correctly with 0 count`, () => {
    const tree = renderer
      .create(
          <Mistakes
            count={0}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with 1 count`, () => {
    const tree = renderer
      .create(
          <Mistakes
            count={1}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
