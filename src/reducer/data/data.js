const initialState = {
  questions: [],
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  STUB_BAD_DATA: `STUB_BAD_DATA`
};

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),

  stubBadData: () => ({
    type: ActionType.STUB_BAD_DATA,
    payload: [null],
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      })
      .catch((error) => {
        dispatch(ActionCreator.stubBadData());
        throw error;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload,
      });
    case ActionType.STUB_BAD_DATA:
      return Object.assign({}, state, {
        questions: action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
