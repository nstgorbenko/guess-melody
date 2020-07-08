import React from "react";
import renderer from "react-test-renderer";

import withUserAnswer from "./with-user-answer.js";

const testQuestion = {
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

const MockComponent = () => (<div></div>);

describe(`WithUserAnswer HOC rendering`, () => {
  it(`WithUserAnswer should render correctly`, () => {
    const MockComponentWrapped = withUserAnswer(MockComponent);

    const tree = renderer
      .create(<MockComponentWrapped question={testQuestion}
        userAnswers={[false, true, false, false]}
        onAnswer={() => {}}
        onChange={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
