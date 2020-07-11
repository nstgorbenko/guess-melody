import withUserAnswer from "./with-user-answer.js";

import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import React from "react";

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

describe(`WithUserAnswer HOC working test`, () => {
  it(`changes answers`, () => {
    const MockComponentWrapped = withUserAnswer(MockComponent);

    const mockComponentWrapped = shallow(
        <MockComponentWrapped
          question={mock.question}
          onAnswer={() => {}}
        />);

    expect(mockComponentWrapped.props().userAnswers).toEqual([false, false, false, false]);

    mockComponentWrapped.props().onChange(0, true);
    expect(mockComponentWrapped.props().userAnswers).toEqual([true, false, false, false]);

    mockComponentWrapped.props().onChange(0, false);
    expect(mockComponentWrapped.props().userAnswers).toEqual([false, false, false, false]);

    mockComponentWrapped.props().onChange(1, true);
    expect(mockComponentWrapped.props().userAnswers).toEqual([false, true, false, false]);
  });
});
