import PropTypes from "prop-types";
import React from "react";

import {GameType} from "../../const.js";

const GenreQuestionScreen = (props) => {
  const {question, userAnswers, onAnswer, onChange, renderPlayer} = props;
  const {answers, genre} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer();
        }}
      >
        {answers.map((answer, index) => (
          <div className="track" key={`${index}-${answer.src}`}>
            {renderPlayer(answer.src, index)}
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer"
                value={`answer-${index}`}
                id={`answer-${index}`}
                checked={userAnswers[index]}
                onChange={(evt) => onChange(index, evt.target.checked)}
              />
              <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
            </div>
          </div>
        ))}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  userAnswers: PropTypes.arrayOf(Boolean).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
