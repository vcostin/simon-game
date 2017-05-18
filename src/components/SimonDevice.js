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
  repeatSequence,
  checkRepeatSequence,
  startPlaySequence,
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
    this.props.repeatSequence(this.props.sequenceOrder + 1, soundId);
  }

  playSimonSequence() {
    this.stopPlaySequence();
    if (!this.props.simonOrder.length) {
      this.addToSequence();
    }
    this.props.startPlaySequence();
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
    let answerCheck = '';
    if (this.props.isCorrect === true) {
      answerCheck = 'Correct!';
    }
    if (this.props.isCorrect === false) {
      answerCheck = 'Incorrect!';
    }

    return (
      <div>
        <h1>Hit a button for sound</h1>
        <button onClick={this.playSimonSequence}>Play Sequence</button>
        <button onClick={this.stopPlaySequence}>Stop Sequence</button>
        <button onClick={this.addToSequence}>Add to sequence</button>
        <button onClick={this.resetSequence}>Reset sequence</button>
        <div className="answer-check">
          {answerCheck}
        </div>
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
  currentSoundId: PropTypes.number,
  sequenceOrder: PropTypes.number.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  increaseSimonIndex: PropTypes.func.isRequired,
  resetSimonIndex: PropTypes.func.isRequired,
  currentPlaying: PropTypes.func.isRequired,
  addToSequence: PropTypes.func.isRequired,
  resetSequence: PropTypes.func.isRequired,
  repeatSequence: PropTypes.func.isRequired,
  startPlaySequence: PropTypes.func.isRequired,
};

SimonDevice.defaultProps = {
  currentSoundId: null,
};

function mapStateToProps(state) {
  return {
    sequenceOrder: state.sequenceOrder,
    simonOrder: state.simonOrder,
    simonOrderIndex: state.simonOrderIndex,
    isPlaying: state.isPlaying,
    isCorrect: state.isCorrect,
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
    repeatSequence: bindActionCreators(repeatSequence, dispatch),
    checkRepeatSequence: bindActionCreators(checkRepeatSequence, dispatch),
    startPlaySequence: bindActionCreators(startPlaySequence, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimonDevice);

