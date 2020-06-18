import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

configure({
  adapter: new Adapter()
});

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};

const mockEvent = {
  preventDefault() {}
};

describe(`ArtistQuestionScreen working test`, () => {
  it(`Data passed to callback is consistent with user answer`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();
    const userAnswer = {
      artist: `one`,
      picture: `pic-one`,
    };

    const screen = shallow(<ArtistQuestionScreen
      onAnswer={onAnswer}
      question={question}
    />);

    const firstInput = screen.find(`input`).at(0);
    firstInput.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(question, userAnswer);
  });
});
