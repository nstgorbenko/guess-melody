import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player.jsx';

const testChildren = <audio />;

describe(`AudioPlayer Component rendering`, () => {
  it(`AudioPlayer Component should render correctly`, () => {
    const tree = renderer
      .create(
          <AudioPlayer
            isLoading={true}
            isPlaying={false}
            onClick={() => {}}>
            {testChildren}
          </AudioPlayer>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
