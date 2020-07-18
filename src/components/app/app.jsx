import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator} from "../../reducer/game/game.js";
import {AppRoute} from "../../const.js";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import ErrorScreen from "../error-screen/error-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import {GameType, START_STEP} from "../../const.js";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getMaxMistakes, getMistakes, getStep} from "../../reducer/game/selectors.js";
import {getQuestions} from "../../reducer/data/selectors.js";
import LoginScreen from "../login-screen/login-screen.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));

class App extends PureComponent {
  _renderArtistQuestionScreen(topic) {
    const {questions, step, onUserAnswer} = this.props;
    const question = topic || questions[step];

    return (
      <GameScreen type={GameType.ARTIST}>
        <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        />
      </GameScreen>
    );
  }

  _renderGenreQuestionScreen(topic) {
    const {questions, step, onUserAnswer} = this.props;
    const question = topic || questions[step];

    return (
      <GameScreen type={GameType.GENRE}>
        <GenreQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        />
      </GameScreen>
    );
  }

  _renderGameScreen() {
    const {authorizationStatus, mistakes, maxMistakes, questions, step, onWelcomeButtonClick} = this.props;
    const question = questions[step];

    if (questions[0] === null) {
      return (
        <ErrorScreen />
      );
    }

    if (step === START_STEP && questions.length > 0) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return <Redirect to={AppRoute.LOSE}/>;
    }

    if (step >= questions.length && authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.RESULT}/>;
    }

    if (step >= questions.length && authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return <Redirect to={AppRoute.LOGIN}/>;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return this._renderArtistQuestionScreen();
        case GameType.GENRE:
          return this._renderGenreQuestionScreen();
      }
    }

    return null;
  }

  render() {
    const {mistakes, questions, login, onStartOver} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <LoginScreen
              onReplayButtonClick={onStartOver}
              onSubmit={login}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen
              onReplayButtonClick={onStartOver}
            />
          </Route>
          <PrivateRoute exact path={AppRoute.RESULT}
            render={() => {
              return (
                <WinScreen
                  questionsCount={questions.length}
                  mistakesCount={mistakes}
                  onReplayButtonClick={onStartOver}
                />
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  login: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onStartOver: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
  step: getStep(state),
  questions: getQuestions(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.checkMistakes(question, answer));
    dispatch(ActionCreator.takeNextStep());
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.takeNextStep());
  },
  onStartOver() {
    dispatch(ActionCreator.startOver());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
