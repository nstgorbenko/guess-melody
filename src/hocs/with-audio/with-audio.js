import PropTypes from "prop-types";
import React, {createRef, PureComponent} from "react";

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
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
          progress: Math.floor(audio.currentTime),
        });
    }

    componentDidUpdate(prevProps) {
      const audio = this._audioRef.current;

      if (this.props.isPlaying !== prevProps.isPlaying) {
        this.setState({
          isPlaying: this.props.isPlaying,
        });
      }

      if (this.state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
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

    _handleClick() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying
      }));
      this.props.onPlayButtonClick();
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onClick={() => this._handleClick()}
        >
          <audio ref={this._audioRef} />
        </Component>
      );
    }
  }

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
  };

  return WithAudio;
};

export default withAudio;
