import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

configure({
  adapter: new Adapter()
});

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

describe(`GenreQuestionScreen working test`, () => {
  it(`When user try to submit form, default action will not occur`, () => {
    const {question} = mock;
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

  it(`Data passed to onChange callback is consistent with input data`, () => {
    const {question} = mock;
    const onChange = jest.fn();

    const genreQuestion = shallow(
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
