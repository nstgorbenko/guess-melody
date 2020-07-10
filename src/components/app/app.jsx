import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {ActionCreator} from "../../reducer/game/game.js";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import {GameType, START_STEP} from "../../const.js";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {getMaxMistakes, getMistakes, getStep} from "../../reducer/game/selectors.js";
import {getQuestions} from "../../reducer/data/selectors.js";
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
    const {mistakes, maxMistakes, questions, step, onWelcomeButtonClick, onStartOver} = this.props;
    const question = questions[step];

    if (step === START_STEP) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={onStartOver}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={onStartOver}
        />
      );
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
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            {this._renderArtistQuestionScreen(questions[1])}
          </Route>
          <Route exact path="/genre">
            {this._renderGenreQuestionScreen(questions[0])}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onStartOver: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
  step: getStep(state),
  questions: getQuestions(state),
});

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.checkMistakes(question, answer));
    dispatch(ActionCreator.takeNextStep());
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.takeNextStep());
  },
  onStartOver() {
    dispatch(ActionCreator.startOver());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
