import {GameScreen} from "./game-screen.jsx";
import {GameType} from "../../const.js";

import React from "react";
import renderer from "react-test-renderer";

const mockChildren = <div className="children-component" />;

describe(`GameScreen Component rendering`, () => {
  it(`renders correctly with type GameType.ARTIST`, () => {
    const tree = renderer
      .create(
          <GameScreen type={GameType.ARTIST} mistakes={3}>
            {mockChildren}
          </GameScreen>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with type GameType.GENRE`, () => {
    const tree = renderer
      .create(
          <GameScreen type={GameType.GENRE} mistakes={3}>
            {mockChildren}
          </GameScreen>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
