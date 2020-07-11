import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => state[NAME_SPACE].questions;
