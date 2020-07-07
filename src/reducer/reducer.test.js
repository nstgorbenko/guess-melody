import {ActionCreator, ActionType, reducer} from "./reducer.js";
import questions from "../mocks/questions.js";

const testInitialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions
};

describe(`Reducer work properly`, () => {
  it(`Reducer shouls return initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHECK_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      maxMistakes: 3,
      step: -1,
      questions
    });

    expect(reducer(testInitialState, {
      type: ActionType.CHECK_MISTAKES,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.TAKE_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: 0,
      questions
    });

    expect(reducer(testInitialState, {
      type: ActionType.TAKE_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions
    });
  });
});

describe(`Action creators work properly`, () => {
  it(`Action creator changing step returns action with 1 payload`, () => {
    expect(ActionCreator.takeNextStep()).toEqual({
      type: ActionType.TAKE_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistakes returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.checkMistakes({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.CHECK_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistakes returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.checkMistakes({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: ActionType.CHECK_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistakes returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.checkMistakes({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        }, {
          genre: `jazz`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [false, true, false, false])).toEqual({
      type: ActionType.CHECK_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistakes returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.checkMistakes({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [true, true, true, true])).toEqual({
      type: ActionType.CHECK_MISTAKES,
      payload: 1,
    });
  });
});
