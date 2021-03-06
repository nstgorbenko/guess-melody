import withAudio from "./with-audio.js";

import Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import PropTypes from "prop-types";
import React from "react";

configure({
  adapter: new Adapter()
});

const mockPlayer = (props) => {
  const {onClick, children} = props;
  return (
    <div>
      <button onClick={onClick} />
      {children}
    </div>
  );
};

mockPlayer.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

describe(`WithAudio HOC working test`, () => {
  it(`checks that HOC's callback turn on audio (play)`, () => {
    const PlayerWrapped = withAudio(mockPlayer);
    const playerWrapped = mount(
        <PlayerWrapped
          isPlaying={false}
          onPlayButtonClick={() => {}}
          src=""
        />);

    window.HTMLMediaElement.prototype.play = () => {};

    const {_audioRef} = playerWrapped.instance();
    jest.spyOn(_audioRef.current, `play`);

    playerWrapped.instance().componentDidMount();
    playerWrapped.find(`button`).simulate(`click`);
    expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`checks that HOC's callback turn off audio (pause)`, () => {
    const PlayerWrapped = withAudio(mockPlayer);
    const playerWrapped = mount(
        <PlayerWrapped
          isPlaying={true}
          onPlayButtonClick={() => {}}
          src=""
        />);

    window.HTMLMediaElement.prototype.pause = () => {};

    const {_audioRef} = playerWrapped.instance();
    jest.spyOn(_audioRef.current, `pause`);

    playerWrapped.instance().componentDidMount();
    playerWrapped.find(`button`).simulate(`click`);
    expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
  });
});
