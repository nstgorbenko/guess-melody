import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {errorsCount, questions} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsCount = {errorsCount}
            onWelcomeButtonClick = {welcomeButtonHandler}
          />
        </Route>
        <Route exact path="/artist">
          <ArtistQuestionScreen/>
        </Route>
        <Route exact path="/genre">
          <GenreQuestionScreen
            question={questions[0]}
            onAnswer={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
