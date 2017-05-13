import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimonButton extends Component {
  constructor(props) {
    super(props);
    this.handlePlaySound = this.handlePlaySound.bind(this);
  }

  handlePlaySound() {
    const { audio } = this.props;
    // this.audio.pause();
    audio.currentTime = 0;
    audio.play();
    this.props.onButtonClickAction(this.props.soundId);
  }

  isPlaying() {
    return this.props.soundId === this.props.currentSoundId;
  }

  render() {
    return (<div>
      <button
        onClick={this.handlePlaySound}
        style={{ backgroundColor: this.props.background }}
        className={this.isPlaying() ? 'active' : ''}
      >PLAY!!!
      </button>
    </div>);
  }
}

SimonButton.propTypes = {
  audio: PropTypes.instanceOf(Audio).isRequired,
  background: PropTypes.string.isRequired,
  soundId: PropTypes.number.isRequired,
  currentSoundId: PropTypes.number.isRequired,
  onButtonClickAction: PropTypes.func.isRequired,

};

export default SimonButton;
