import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";

import {ActionCreator, AuthorizationStatus, Operation as UserOperation} from "./reducer/user/user.js";
import App from "./components/app/app.jsx";
import createAPI from "./api.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import reducer from "./reducer/reducer.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuthorization());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
