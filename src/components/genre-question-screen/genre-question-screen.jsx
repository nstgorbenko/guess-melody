import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import AudioPlayer from "../audio-player/audio-player.jsx";
import {GameType} from "../../const.js";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  render() {
    const {question, onAnswer} = this.props;
    const {answers, genre} = question;

    const {answers: userAnswers} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(question, this.state.answers);
          }}
        >
          {answers.map(((answer, index) => (
            <div className="track" key={`${index}-${answer.src}`}>
              <AudioPlayer
                isPlaying={false}
                src={answer.src}
              />
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer"
                  value={`answer-${index}`}
                  id={`answer-${index}`}
                  checked={userAnswers[index]}
                  onChange={(evt) => {
                    this._handleInputChange(evt, index);
                  }}
                />
                <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
              </div>
            </div>
          )))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }

  _handleInputChange(evt, index) {
    const {answers: userAnswers} = this.state;
    const value = evt.target.checked;

    this.setState({
      answers: [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)],
    });
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired
    })
    ).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default GenreQuestionScreen;
