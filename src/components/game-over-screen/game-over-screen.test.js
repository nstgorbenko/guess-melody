import React from "react";
import renderer from "react-test-renderer";

import GameOverScreen from "./game-over-screen.jsx";

describe(`GameOverScreen Component rendering`, () => {
  it(`GenreQuestionItem Component should render correctly`, () => {
    const tree = renderer
      .create(<GameOverScreen
        onReplayButtonClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
