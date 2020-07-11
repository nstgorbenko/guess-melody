import ArtistQuestionScreen from './artist-question-screen.jsx';

import React from 'react';
import renderer from 'react-test-renderer';

const mockQuestion = {
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
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <ArtistQuestionScreen
            question={mockQuestion}
            onAnswer={() => {}}
            renderPlayer={() => {}}
          />, {
            createNodeMock: () => ({})
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
