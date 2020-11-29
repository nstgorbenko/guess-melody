import GameOverScreen from "./game-over-screen.jsx";

import {BrowserRouter} from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

describe(`GameOverScreen Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <GameOverScreen
              onReplayButtonClick={() => {}}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
