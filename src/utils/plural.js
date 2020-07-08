export const ANSWERS_PLURALS = [`вопрос`, `вопроса`, `вопросов`];
export const MISTAKES_PLURALS = [`ошибку`, `ошибки`, `ошибок`];

export const getPluralForm = (count, options) => {
  const cases = [2, 0, 1, 1, 1, 2];
  let choice;

  if (count % 100 > 4 && count % 100 < 20) {
    choice = 2;
  } else if (count % 10 < 5) {
    choice = cases[count % 10];
  } else {
    choice = cases[5];
  }

  return `${count} ${options[choice]}`;
};
