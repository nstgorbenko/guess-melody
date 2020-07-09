import PropTypes from "prop-types";
import React from "react";

import {GameType} from "../../const.js";
import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";

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
          <GenreQuestionItem key={`${index}-${answer.src}`}
            answer={answer}
            id={index}
            userAnswer={userAnswers[index]}
            onChange={onChange}
            renderPlayer={renderPlayer}
          />
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
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
