import {GameType} from "../const.js";

const getCorrectGenreAnswers = (question) =>
  question.answers.map(({genre}) =>
    genre === question.genre);

const isGenreAnswerCorrect = (question, userAnswers) => {
  const correctAnswers = getCorrectGenreAnswers(question);

  return userAnswers.every((userAnswer, index) =>
    userAnswer === correctAnswers[index]);
};

const isArtistAnswerCorrect = (question, userAnswer) => userAnswer.artist === question.song.artist;

export const checkAnswerResult = (question, userAnswer) => {
  switch (question.type) {
    case GameType.ARTIST:
      return isArtistAnswerCorrect(question, userAnswer);
    case GameType.GENRE:
      return isGenreAnswerCorrect(question, userAnswer);
    default:
      throw new Error(`Unknown question type: ${question.type}`);
  }
};
