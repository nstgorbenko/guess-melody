import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({
  adapter: new Adapter()
});

describe(`AudioPlayer working test`, () => {
  it(`Click on Play button calls callback`, () => {
    const onClick = jest.fn();

    const audioPlayer = shallow(<AudioPlayer
      isLoading={false}
      isPlaying={false}
      onClick={onClick}>
      <audio />
    </AudioPlayer>);

    audioPlayer.find(`.track__button`).simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
