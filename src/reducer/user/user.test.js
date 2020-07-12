import {ActionCreator, ActionType, Operation, reducer} from "./user.js";

import createAPI from "../../api.js";
import MockAdapter from "axios-mock-adapter";

const mockInitialState = {
  authorizationStatus: `NO_AUTH`,
};

const api = createAPI(() => {});

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});
    expect(initialReducer).toEqual(mockInitialState);
  });

  it(`changes authorizationStatus by a given value`, () => {
    expect(reducer(mockInitialState, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: `AUTH`,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });

    expect(reducer(mockInitialState, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: `NO_AUTH`,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
    });

    expect(reducer({
      authorizationStatus: `AUTH`,
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: `NO_AUTH`,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
    });

    expect(reducer({
      authorizationStatus: `AUTH`,
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: `AUTH`,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });
  });
});

describe(`Action creators working test`, () => {
  it(`returns action with given value in payload`, () => {
    expect(ActionCreator.requireAuthorization(`NO_AUTH`)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: `NO_AUTH`,
    });

    expect(ActionCreator.requireAuthorization(`AUTH`)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: `AUTH`,
    });
  });
});

describe(`Operation working test`, () => {
  it(`makes a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authorizationChecker = Operation.checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(200);

    return authorizationChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: `AUTH`,
        });
      });
  });
});
