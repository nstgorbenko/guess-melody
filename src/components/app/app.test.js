import {App} from "./app.jsx";

import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";

const mockStore = configureStore([]);

const mockQuestions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Jim Beam`,
    }],
  },
];

describe(`App Component rendering`, () => {
  it(`renders WelcomeScreen correctly`, () => {
    const store = mockStore({
      GAME: {mistakes: 3}
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={1}
              maxMistakes={3}
              questions={mockQuestions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              onStartOver={() => {}}
              step={-1}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders GenreQuestionScreen correctly`, () => {
    const store = mockStore({
      GAME: {mistakes: 3}
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={1}
              maxMistakes={3}
              questions={mockQuestions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              onStartOver={() => {}}
              step={0}
            />
          </Provider>, {
            createNodeMock: () => ({})
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders ArtistQuestionScreen correctly`, () => {
    const store = mockStore({
      GAME: {mistakes: 3}
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={1}
              maxMistakes={3}
              questions={mockQuestions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              onStartOver={() => {}}
              step={1}
            />
          </Provider>, {
            createNodeMock: () => ({})
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders GameOverScreen correctly`, () => {
    const store = mockStore({
      GAME: {mistakes: 3}
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={3}
              maxMistakes={3}
              questions={mockQuestions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              onStartOver={() => {}}
              step={1}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders WinScreen correctly`, () => {
    const store = mockStore({
      GAME: {mistakes: 3}
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={0}
              maxMistakes={3}
              questions={mockQuestions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              onStartOver={() => {}}
              step={3}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
