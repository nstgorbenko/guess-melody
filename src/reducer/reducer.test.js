import {ActionCreator, ActionType, Operation, reducer} from "./reducer.js";
import createAPI from "../api.js";
import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
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
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions: testQuestions
    });
  });

  it(`should increment number of mistakes by a given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHECK_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      maxMistakes: 3,
      step: -1,
      questions: []
    });

    expect(reducer(testInitialState, {
      type: ActionType.CHECK_MISTAKES,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions: []
    });
  });

  it(`should increment current step by a given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.TAKE_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: 0,
      questions: []
    });

    expect(reducer(testInitialState, {
      type: ActionType.TAKE_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
      questions: []
    });
  });

  it(`should return initial state`, () => {
    expect(reducer({
      step: 5,
      mistakes: 1,
    }, {
      type: ActionType.START_OVER,
      payload: null,
    })).toEqual(testInitialState);

    expect(reducer({
      step: 0,
      mistakes: 0,
    }, {
      type: ActionType.START_OVER,
      payload: null,
    })).toEqual(testInitialState);

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.START_OVER,
      payload: null,
    })).toEqual(testInitialState);
  });
});

describe(`Action creators work properly`, () => {
  it(`returns action with 1 payload`, () => {
    expect(ActionCreator.takeNextStep()).toEqual({
      type: ActionType.TAKE_STEP,
      payload: 1,
    });
  });

  it(`returns action with 0 payload if answer for artist is correct`, () => {
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

  it(`returns action with 1 payload if answer for artist is incorrect`, () => {
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

  it(`returns action with 0 payload if answer for genre is correct`, () => {
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

  it(`mistakes returns action with 1 payload if answer for genre is incorrect`, () => {
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

  it(`returns action with null payload`, () => {
    expect(ActionCreator.startOver())
      .toEqual({
        type: ActionType.START_OVER,
        payload: null,
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
