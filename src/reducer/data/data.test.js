import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import createAPI from "../../api.js";
import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  questions: []
};

const testQuestions = [{
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
}, {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `https://api.adorable.io/avatars/128/1`,
    artist: `John Snow`,
  }, {
    picture: `https://api.adorable.io/avatars/128/2`,
    artist: `Jack Daniels`,
  }, {
    picture: `https://api.adorable.io/avatars/128/3`,
    artist: `Jim Beam`,
  }],
}];

const api = createAPI(() => {});

describe(`Reducer work properly`, () => {
  it(`should return initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`should update questions by load`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_QUESTIONS,
      payload: testQuestions,
    })).toEqual({
      questions: testQuestions
    });
  });

  it(`should update questions with [null] value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.STUB_BAD_DATA,
      payload: [null],
    })).toEqual({
      questions: [null]
    });
  });
});

describe(`Action creators work properly`, () => {
  it(`returns action with given value`, () => {
    expect(ActionCreator.loadQuestions(testQuestions)).toEqual({
      type: ActionType.LOAD_QUESTIONS,
      payload: testQuestions,
    });
  });

  it(`returns action with [null] payload`, () => {
    expect(ActionCreator.stubBadData()).toEqual({
      type: ActionType.STUB_BAD_DATA,
      payload: [null],
    });
  });
});

describe(`Operation work properly`, () => {
  it(`make a correct API call to /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});
