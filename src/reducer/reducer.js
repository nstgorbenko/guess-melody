import {extend} from "../utils.js";
import questions from "../mocks/questions.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  NEXT_STEP: `NEXT_STEP`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });
    case ActionType.NEXT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });
  }
  return state;
};

export {ActionType, reducer};
