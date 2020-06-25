import React from "react";
import renderer from "react-test-renderer";
import GameScreen from "./game-screen.jsx";
import {GameType} from "../../const.js";

const testChildren = <div className="children-component" />;

describe(`GameScreen Component rendering`, () => {
  it(`GameScreen Component should render correctly with type GameType.ARTIST`, () => {
    const tree = renderer
      .create(
          <GameScreen type={GameType.ARTIST}>
            {testChildren}
          </GameScreen>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`GameScreen Component should render correctly with type GameType.GENRE`, () => {
    const tree = renderer
      .create(
          <GameScreen type={GameType.GENRE}>
            {testChildren}
          </GameScreen>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
