import {extend} from "../utils.js";
import {GameType} from "../const.js";
import questions from "../mocks/questions.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  NEXT_STEP: `NEXT_STEP`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((song, i) => {
    return song === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  passNextStep: () => ({
    type: ActionType.NEXT_STEP,
    payload: 1,
  }),

  incrementMistakes: (question, userAnswer) => {
    let answerIsCorrect = true;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });
    case ActionType.NEXT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
