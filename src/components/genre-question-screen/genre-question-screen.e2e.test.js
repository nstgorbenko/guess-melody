import GenreQuestionScreen from "./genre-question-screen.jsx";

import Adapter from "enzyme-adapter-react-16";
import {configure, mount, shallow} from "enzyme";
import React from "react";

configure({
  adapter: new Adapter()
});

const mockQuestion = {
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

describe(`GenreQuestionScreen working test`, () => {
  it(`prevents default action when user try to submit form`, () => {
    const {question} = mockQuestion;
    const onAnswer = jest.fn();
    const genreQuestion = shallow(
        <GenreQuestionScreen
          question={question}
          userAnswers={[false, false, false, false]}
          onAnswer={onAnswer}
          onChange={() => {}}
          renderPlayer={() => {}}
        />
    );

    const form = genreQuestion.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`passes to callback data consistent with input checked attribute`, () => {
    const {question} = mockQuestion;
    const onChange = jest.fn();

    const genreQuestion = mount(
        <GenreQuestionScreen
          question={question}
          userAnswers={[false, false, false, false]}
          onAnswer={() => {}}
          onChange={onChange}
          renderPlayer={() => {}}
        />
    );

    const secondIndex = 1;
    const secondInput = genreQuestion.find(`input`).at(secondIndex);

    secondInput.simulate(`change`, {target: {checked: true}});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(secondIndex, true);
  });
});
