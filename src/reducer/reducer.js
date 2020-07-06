import {checkAnswerResult} from "../utils/mistake.js";
import questions from "../mocks/questions.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions
};

const ActionType = {
  CHECK_MISTAKES: `CHECK_MISTAKES`,
  START_OVER: `START_OVER`,
  TAKE_STEP: `TAKE_STEP`,
};

const ActionCreator = {
  checkMistakes: (question, userAnswer) => {
    const isAnswerCorrect = checkAnswerResult(question, userAnswer);

    return {
      type: ActionType.CHECK_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },

  startOver: () => ({
    type: ActionType.START_OVER,
  }),

  takeNextStep: () => ({
    type: ActionType.TAKE_STEP,
    payload: 1,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });
    case ActionType.TAKE_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });
    case ActionType.START_OVER:
      return Object.assign({}, initialState, {
        step: 0,
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
