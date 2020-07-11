import GenreQuestionItem from "./genre-question-item.jsx";

import React from "react";
import renderer from "react-test-renderer";

const mockAnswer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

describe(`GenreQuestionItem Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <GenreQuestionItem
            answer={mockAnswer}
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
