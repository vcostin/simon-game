import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimonButton from './SimonButton';
import {
  resetSequence,
  increaseSimonIndex,
  resetSimonIndex,
  currentPlaying,
  addToSequence,
} from '../actions/simonActions';

const sounds = [
  { id: 1, src: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', color: 'green' },
  { id: 2, src: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', color: 'red' },
  { id: 3, src: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', color: 'yellow' },
  { id: 4, src: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3', color: 'blue' },
].map((item) => {
  const { id, color, src } = item;
  return ({ id, color, audio: new Audio(src) });
});

// gen a number between 1-4
const simonRand = () => Math.floor(Math.random() * sounds.length) + 1;


class SimonDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
    this.playTimer = 0;
    this.lastSoundTimer = 0;
    this.handleButtonClickAction = this.handleButtonClickAction.bind(this);
    this.playSimonSequence = this.playSimonSequence.bind(this);
    this.stopPlaySequence = this.stopPlaySequence.bind(this);
    this.playNext = this.playNext.bind(this);
    this.addToSequence = this.addToSequence.bind(this);
    this.resetSequence = this.resetSequence.bind(this);
  }

  handleButtonClickAction(soundId) {
    console.log(soundId);
  }

  playSimonSequence() {
    this.stopPlaySequence();
    if (!this.props.simonOrder.length) {
      this.addToSequence();
    }
    clearTimeout(this.lastSoundTimer);
    this.playTimer = setInterval(this.playNext, 1000);
  }

  playNext() {
    const findSound = sounds.find(sound => (sound.id === this.props.simonOrder[this.props.simonOrderIndex]));
    findSound.audio.play();
    this.props.currentPlaying(findSound.id);
    this.props.increaseSimonIndex();
    if (this.props.simonOrderIndex === this.props.simonOrder.length) {
      this.stopSequence();
      this.lastSoundTimer = setTimeout(this.props.currentPlaying, 1000);
    }
  }

  stopSequence() {
    this.props.resetSimonIndex();
    clearInterval(this.playTimer);
  }

  stopPlaySequence() {
    this.stopSequence();
    this.props.currentPlaying();
  }

  addToSequence() {
    this.props.addToSequence(simonRand());
  }

  resetSequence() {
    this.stopPlaySequence();
    this.props.resetSequence();
  }

  render() {
    return (
      <div>
        <h1>Hit a button for sound</h1>
        <button onClick={this.playSimonSequence}>Play Sequence</button>
        <button onClick={this.stopPlaySequence}>Stop Sequence</button>
        <button onClick={this.addToSequence}>Add to sequence</button>
        <button onClick={this.resetSequence}>Reset sequence</button>
        {sounds.map(sound => (
          <SimonButton
            onButtonClickAction={this.handleButtonClickAction}
            key={sound.id}
            currentSoundId={this.props.currentSoundId}
            soundId={sound.id}
            audio={sound.audio}
            background={sound.color}
          />
        ))}
      </div>
    );
  }
}

SimonDevice.propTypes = {
  simonOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
  simonOrderIndex: PropTypes.number.isRequired,
  currentSoundId: PropTypes.number.isRequired,
  increaseSimonIndex: PropTypes.func.isRequired,
  resetSimonIndex: PropTypes.func.isRequired,
  currentPlaying: PropTypes.func.isRequired,
  addToSequence: PropTypes.func.isRequired,
  resetSequence: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    simonOrder: state.simonOrder,
    simonOrderIndex: state.simonOrderIndex,
    isPlaying: state.isPlaying,
    currentSoundId: state.currentSoundId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetSequence: bindActionCreators(resetSequence, dispatch),
    increaseSimonIndex: bindActionCreators(increaseSimonIndex, dispatch),
    resetSimonIndex: bindActionCreators(resetSimonIndex, dispatch),
    currentPlaying: bindActionCreators(currentPlaying, dispatch),
    addToSequence: bindActionCreators(addToSequence, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimonDevice);

