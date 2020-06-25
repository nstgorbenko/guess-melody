import {BrowserRouter, Route, Switch} from "react-router-dom";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import {GameType} from "../../const.js";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _switchToNextScreen() {
    this.setState((prevState) => ({
      step: prevState.step + 1
    })
    );
  }

  _renderArtistQuestionScreen(topic) {
    const question = topic || this.props.questions[this.state.step];

    return (
      <GameScreen type={GameType.ARTIST}>
        <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={() => this._switchToNextScreen()}
        />
      </GameScreen>
    );
  }

  _renderGenreQuestionScreen(topic) {
    const question = topic || this.props.questions[this.state.step];

    return (
      <GameScreen type={GameType.GENRE}>
        <GenreQuestionScreenWrapped
          question={question}
          onAnswer={() => this._switchToNextScreen()}
        />
      </GameScreen>
    );
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => this._switchToNextScreen()}
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
