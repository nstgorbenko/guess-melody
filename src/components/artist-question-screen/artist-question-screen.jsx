import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";

const ArtistQuestionScreen = (props) => {
  const {question, onAnswer} = props;
  const {answers, song} = question;

  return (
    <section className="game game--artist">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio src={song.src}></audio>
            </div>
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, index) => (
            <div className="artist" key={answer.artist}>
              <input className="artist__input visually-hidden" type="radio" name="answer"
                value={`artist-${index}`}
                id={`artist-${index}`}
                onChange={(evt) => {
                  evt.preventDefault();
                  onAnswer(question, answer);
                }}
              />
              <label className="artist__name" htmlFor={`artist-${index}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist}/>
                {answer.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired
    })
    ).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default ArtistQuestionScreen;
