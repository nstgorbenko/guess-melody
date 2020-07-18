import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import {ANSWERS_PLURALS, getPluralForm, MISTAKES_PLURALS} from "../../utils/plural.js";
import {AppRoute} from "../../const.js";

const WinScreen = (props) => {
  const {questionsCount, mistakesCount, onReplayButtonClick} = props;
  const correctAnswersCount = questionsCount - mistakesCount;

  const questionsResult = getPluralForm(correctAnswersCount, ANSWERS_PLURALS);
  const mistakesResult = getPluralForm(mistakesCount, MISTAKES_PLURALS);

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {questionsResult} и совершили {mistakesResult}</p>
      <Link className="replay"
        to={AppRoute.ROOT}
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>
  );
};

WinScreen.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default WinScreen;
