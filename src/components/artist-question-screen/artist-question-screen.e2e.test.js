import ArtistQuestionScreen from "./artist-question-screen.jsx";

import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import React from "react";

configure({
  adapter: new Adapter()
});

const mockQuestion = {
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
  it(`passes to callback data consistent with user answer`, () => {
    const {question} = mockQuestion;
    const onAnswer = jest.fn();
    const userAnswer = {
      artist: `one`,
      picture: `pic-one`,
    };

    const screen = shallow(
        <ArtistQuestionScreen
          question={question}
          onAnswer={onAnswer}
          renderPlayer={() => {}}
        />);

    const firstInput = screen.find(`input`).at(0);
    firstInput.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(question, userAnswer);
  });
});
