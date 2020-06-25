import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({
  adapter: new Adapter()
});

describe(`AudioPlayer working test`, () => {
  it(`AudioPlayer button initial state is "pause". When user click on button it change its view to "play" and back to "pause" after second click`, () => {
    const isPlaying = true;
    const onPlayButtonClick = jest.fn();

    const audioPlayer = shallow(<AudioPlayer
      isPlaying = {isPlaying}
      onPlayButtonClick = {onPlayButtonClick}
      src = {``}/>,
    {disableLifecycleMethods: true});

    const playButton = audioPlayer.find(`.track__button`);

    expect(audioPlayer.exists(`.track__button--pause`)).toBe(true);

    playButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
    expect(audioPlayer.exists(`.track__button--play`)).toBe(true);
    expect(audioPlayer.exists(`.track__button--pause`)).toBe(false);

    playButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(2);
    expect(audioPlayer.exists(`.track__button--pause`)).toBe(true);
    expect(audioPlayer.exists(`.track__button--play`)).toBe(false);
  });
});
