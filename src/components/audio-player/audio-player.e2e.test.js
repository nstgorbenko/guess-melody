import AudioPlayer from "./audio-player.jsx";

import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import React from "react";

configure({
  adapter: new Adapter()
});

describe(`AudioPlayer working test`, () => {
  it(`calls callback clicking on Play button`, () => {
    const onClick = jest.fn();

    const audioPlayer = shallow(
        <AudioPlayer
          isLoading={false}
          isPlaying={false}
          onClick={onClick}>
          <audio />
        </AudioPlayer>);

    audioPlayer.find(`.track__button`).simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
