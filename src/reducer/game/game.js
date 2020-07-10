import {checkAnswerResult} from "../../utils/mistake.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
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
    payload: null,
  }),

  takeNextStep: () => ({
    type: ActionType.TAKE_STEP,
    payload: 1,
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, getStore, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload,
      });
    case ActionType.CHECK_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });
    case ActionType.TAKE_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });
    case ActionType.START_OVER:
      return Object.assign({}, initialState);
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
