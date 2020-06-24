import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const audio = this._audioRef.current;
    audio.src = this.props.src;

    audio.oncanplaythrough = () =>
      this.setState({
        isLoading: false,
      });

    audio.onplay = () =>
      this.setState({
        isPlaying: true,
      });

    audio.onpause = () =>
      this.setState({
        isPlaying: false,
      });

    audio.ontimeupdate = () =>
      this.setState({
        progress: audio.currentTime
      });
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
    this._audioRef = null;
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.state.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <>
        <button type="button"
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          disabled={isLoading}
          onClick={() => this.setState({isPlaying: !this.state.isPlaying})}
        />
        <div className="track__status">
          <audio ref={this._audioRef}/>
        </div>
      </>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
