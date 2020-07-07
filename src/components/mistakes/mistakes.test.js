import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

describe(`Mistakes Component rendering`, () => {
  it(`Mistakes Component should render correctly with 0 count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={0}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Mistakes Component should render correctly with 1 count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={1}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
