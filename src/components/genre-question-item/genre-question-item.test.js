import React from "react";
import renderer from "react-test-renderer";

import GenreQuestionItem from "./genre-question-item.jsx";

const testAnswer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

describe(`GenreQuestionItem Component rendering`, () => {
  it(`GenreQuestionItem Component should render correctly`, () => {
    const tree = renderer
      .create(
          <GenreQuestionItem
            answer={testAnswer}
            id={0}
            userAnswer={false}
            onChange={() => {}}
            renderPlayer={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
