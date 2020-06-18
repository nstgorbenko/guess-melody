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
          onAnswer={onAnswer}
          question={question}
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

  it(`Data passed to callback is consistent with user answer`, () => {
    const {question} = mock;
    const onAnswer = jest.fn((...args) => [...args]);
    const userAnswer = [false, true, false, false];

    const genreQuestion = shallow(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          question={question}
        />
    );

    const form = genreQuestion.find(`form`);
    const secondInput = genreQuestion.find(`input`).at(1);

    secondInput.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(question, userAnswer);

    const inputCheckedValues = genreQuestion.find(`input`).map((input) => input.prop(`checked`));
    expect(inputCheckedValues).toEqual(userAnswer);
  });
});
