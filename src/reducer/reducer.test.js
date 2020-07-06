import {ActionType, reducer} from "./reducer.js";
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
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      maxMistakes: 3,
      step: -1,
      questions
    });

    expect(reducer(testInitialState, {
      type: ActionType.INCREMENT_MISTAKES,
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
      type: ActionType.NEXT_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: 0,
      questions
    });

    expect(reducer(testInitialState, {
      type: ActionType.NEXT_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions
    });
  });
});
