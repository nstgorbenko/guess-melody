import {ActionCreator, ActionType, reducer} from "./game.js";

const mockInitialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
};

describe(`Reducer working test`, () => {
  it(`return initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(mockInitialState);
  });

  it(`increments number of mistakes by a given value`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.CHECK_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      maxMistakes: 3,
      step: -1,
    });

    expect(reducer(mockInitialState, {
      type: ActionType.CHECK_MISTAKES,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
    });
  });

  it(`increments current step by a given value`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.TAKE_STEP,
      payload: 1,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: 0,
    });

    expect(reducer(mockInitialState, {
      type: ActionType.TAKE_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 0,
      maxMistakes: 3,
      step: -1,
    });
  });

  it(`returns initial state`, () => {
    expect(reducer({
      step: 5,
      mistakes: 1,
    }, {
      type: ActionType.START_OVER,
      payload: null,
    })).toEqual(mockInitialState);

    expect(reducer({
      step: 0,
      mistakes: 0,
    }, {
      type: ActionType.START_OVER,
      payload: null,
    })).toEqual(mockInitialState);

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.START_OVER,
      payload: null,
    })).toEqual(mockInitialState);
  });
});

describe(`Action creators working test`, () => {
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

  it(`returns action with 1 payload if answer for genre is incorrect`, () => {
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

