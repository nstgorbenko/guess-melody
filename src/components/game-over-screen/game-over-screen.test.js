import GameOverScreen from "./game-over-screen.jsx";

import React from "react";
import renderer from "react-test-renderer";

describe(`GameOverScreen Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <GameOverScreen
            onReplayButtonClick={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
