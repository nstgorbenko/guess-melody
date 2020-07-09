import PropTypes from "prop-types";
import React from "react";

const AudioPlayer = (props) => {
  const {isLoading, isPlaying, onClick, children} = props;

  return (
    <>
      <button type="button"
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        disabled={isLoading}
        onClick={() => onClick()}
      />
      <div className="track__status">
        {children}
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default AudioPlayer;
