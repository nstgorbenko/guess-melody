import AudioPlayer from './audio-player.jsx';

import React from 'react';
import renderer from 'react-test-renderer';

const mockChildren = <audio />;

describe(`AudioPlayer Component rendering`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <AudioPlayer
            isLoading={true}
            isPlaying={false}
            onClick={() => {}}>
            {mockChildren}
          </AudioPlayer>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
