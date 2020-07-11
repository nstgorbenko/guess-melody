import React from "react";

const ErrorScreen = () => {
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Упс!</h2>
      <p className="result__total result__total--fail">Что-то пошло не так, перезагрузите страницу.</p>
    </section>
  );
};

export default ErrorScreen;
