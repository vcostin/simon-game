import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimonButton extends Component {
  constructor(props) {
    super(props);
    this.handlePlaySound = this.handlePlaySound.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
  }

  handlePlaySound(e) {
    if (this.props.isPlaying) {
      e.preventDefault();
      return;
    }
    const { audio } = this.props;
    // audio.pause();
    audio.currentTime = 0;
    audio.play();
    this.props.onButtonClickAction(this.props.soundId);
  }

  isPlaying() {
    return this.props.soundId === this.props.currentSoundId;
  }

  addActiveClass() {
    return this.isPlaying() ? 'active' : '';
  }

  render() {
    return (<div className="simon-sound-button">
      <button
        onClick={this.handlePlaySound}
        style={{ backgroundColor: this.props.background }}
        className={this.addActiveClass()}
      />
    </div>);
  }
}

SimonButton.propTypes = {
  audio: PropTypes.instanceOf(Audio).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  background: PropTypes.string.isRequired,
  soundId: PropTypes.number.isRequired,
  currentSoundId: PropTypes.number,
  onButtonClickAction: PropTypes.func.isRequired,
};

SimonButton.defaultProps = {
  currentSoundId: null,
};

export default SimonButton;
