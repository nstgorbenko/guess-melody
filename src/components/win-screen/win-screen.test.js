import WinScreen from "./win-screen.jsx";

import React from "react";
import renderer from "react-test-renderer";

describe(`WinScreen Component rendering`, () => {
  describe(`3 questions`, () => {
    it(`renders with 0 mistakes`, () => {
      const tree = renderer
        .create(
            <WinScreen
              questionsCount={3}
              mistakesCount={0}
              onReplayButtonClick={() => {}}
            />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`renders with 1 mistake`, () => {
      const tree = renderer
        .create(
            <WinScreen
              questionsCount={3}
              mistakesCount={1}
              onReplayButtonClick={() => {}}
            />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`2 questions`, () => {
    it(`renders with 0 mistakes`, () => {
      const tree = renderer
        .create(
            <WinScreen
              questionsCount={2}
              mistakesCount={0}
              onReplayButtonClick={() => {}}
            />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`renders with 1 mistake`, () => {
      const tree = renderer
        .create(
            <WinScreen
              questionsCount={2}
              mistakesCount={1}
              onReplayButtonClick={() => {}}
            />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
