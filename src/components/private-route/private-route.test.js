import {PrivateRoute} from './private-route.jsx';

import {BrowserRouter} from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

describe(`PrivateRoute Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PrivateRoute
              authorizationStatus={`AUTH`}
              path={`/path`}
              exact
              render={() => <div/>}/>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
