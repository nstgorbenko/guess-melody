import WinScreen from "./win-screen.jsx";

import {BrowserRouter} from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

describe(`WinScreen Component rendering`, () => {
  describe(`3 questions`, () => {
    it(`renders with 0 mistakes`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <WinScreen
                questionsCount={3}
                mistakesCount={0}
                onReplayButtonClick={() => {}}
              />
            </BrowserRouter>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`renders with 1 mistake`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <WinScreen
                questionsCount={3}
                mistakesCount={1}
                onReplayButtonClick={() => {}}
              />
            </BrowserRouter>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`2 questions`, () => {
    it(`renders with 0 mistakes`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <WinScreen
                questionsCount={2}
                mistakesCount={0}
                onReplayButtonClick={() => {}}
              />
            </BrowserRouter>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`renders with 1 mistake`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <WinScreen
                questionsCount={2}
                mistakesCount={1}
                onReplayButtonClick={() => {}}
              />
            </BrowserRouter>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
