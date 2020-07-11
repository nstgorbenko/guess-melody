import GenreQuestionScreen from "./genre-question-screen.jsx";

import React from "react";
import renderer from "react-test-renderer";

const mockQuestion = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
};

describe(`GenreQuestionScreen Component rendering`, () => {
  it(`GenreQuestionScreen Component should render correctly`, () => {
    const tree = renderer
      .create(
          <GenreQuestionScreen
            question={mockQuestion}
            userAnswers={[false, false, false, false]}
            onAnswer={() => {}}
            onChange={() => {}}
            renderPlayer={() => {}}
          />, {
            createNodeMock: () => ({})
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
