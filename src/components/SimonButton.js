import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimonButton extends Component {
  constructor(props) {
    super(props);
    this.handlePlaySound = this.handlePlaySound.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
  }

  handlePlaySound(e) {
    if (!this.props.isPlayable) {
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
        className={`simon-button ${this.props.className} ${this.addActiveClass()}`}
      />
    </div>);
  }
}

SimonButton.propTypes = {
  audio: PropTypes.instanceOf(Audio).isRequired,
  isPlayable: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  soundId: PropTypes.number.isRequired,
  currentSoundId: PropTypes.number.isRequired,
  onButtonClickAction: PropTypes.func.isRequired,
};

export default SimonButton;
