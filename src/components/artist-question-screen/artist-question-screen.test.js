import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';

const testQuestion = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `https://api.adorable.io/avatars/128/0`,
    artist: `John Snow`,
  }, {
    picture: `https://api.adorable.io/avatars/128/1`,
    artist: `Jack Daniels`,
  }, {
    picture: `https://api.adorable.io/avatars/128/2`,
    artist: `Jim Beam`,
  }],
};

describe(`ArtistQuestionScreen Component rendering`, () => {
  it(`ArtistQuestionScreen is rendered correctly`, () => {
    const tree = renderer
      .create(
          <ArtistQuestionScreen
            question={testQuestion}
            onAnswer={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
