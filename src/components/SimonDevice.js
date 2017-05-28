import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimonButton from './SimonButton';
import NumbersDisplay from './NumbersDisplay';
import SimonStartButton from './SimonStartButton';
import SimonStrictButton from './SimonStrictButton';
import SimonOnOffSwitch from './SimonOnOffSwitch';
import {
  resetSequence,
  increaseSimonIndex,
  resetSimonIndex,
  currentPlaying,
  addToSequence,
  repeatSequence,
  startPlaySequence,
  switchDeviceToggle,
  strictModeToggle,
} from '../actions/simonActions';
import {
  CORRECT,
  INCORRECT,
} from '../reducers/SimonReducer';

const TIMER_TIME = 500;

const sounds = [
  { id: 1, src: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', className: 'first' },
  { id: 2, src: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', className: 'second' },
  { id: 3, src: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', className: 'third' },
  { id: 4, src: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3', className: 'forth' },
].map((item) => {
  const { id, src, className } = item;
  return ({ id, className, audio: new Audio(src) });
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
    this.handleStrictMode = this.handleStrictMode.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDeviceOn && !this.props.isDeviceOn) {
      clearInterval(this.playTimer);
      this.props.resetSimonIndex();
      this.props.resetSequence();
      if (this.props.isStrictMode) {
        this.props.strictModeToggle();
      }
      return;
    }
    if (this.props.isCorrect === INCORRECT) {
      if (this.props.isStrictMode) {
        this.resetSequence();
      }
      this.playSequenceLag();
    }
    if (this.props.isCorrect === CORRECT && this.props.simonOrder.length === this.props.sequenceOrder) {
      this.addToSequence();
      this.playSequenceLag();
    }
  }

  handleButtonClickAction(soundId) {
    this.props.currentPlaying(soundId);
    this.props.repeatSequence(this.props.sequenceOrder + 1);
  }

  playSequenceLag() {
    setTimeout(this.playSimonSequence, TIMER_TIME);
  }

  playSimonSequence() {
    if (!this.props.isDeviceOn) {
      return;
    }
    this.stopPlaySequence();
    if (!this.props.simonOrder.length) {
      this.addToSequence();
    }
    this.props.startPlaySequence();
    clearTimeout(this.lastSoundTimer);
    this.playTimer = setInterval(this.playNext, TIMER_TIME);
  }

  playNext() {
    const findSound = sounds.find(sound => (sound.id === this.props.simonOrder[this.props.simonOrderIndex]));
    // audio.pause();
    findSound.audio.currentTime = 0;
    findSound.audio.play();
    this.props.currentPlaying(findSound.id);
    this.props.increaseSimonIndex();
    if (this.props.simonOrderIndex === this.props.simonOrder.length) {
      this.stopSequence();
      this.lastSoundTimer = setTimeout(this.props.currentPlaying, TIMER_TIME);
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

  handleStrictMode() {
    if (!this.props.isDeviceOn) {
      return;
    }
    this.props.strictModeToggle();
  }

  render() {
    return (
      <div className="simon-device">
        <div className="simon-control-actions">
          <div className="simon-control-header">
            <h1>Simon<sup>&reg;</sup></h1>
          </div>
          <div className="simon-control-row">
            <NumbersDisplay displayNumber={this.props.simonOrder.length} />
            <SimonStartButton onStartButtonClick={this.playSimonSequence} />
            <SimonStrictButton
              isStrictModeActive={this.props.isStrictMode}
              onToggleStrictMode={this.handleStrictMode}
            />
          </div>
          <div className="simon-control-row">
            <SimonOnOffSwitch
              isDeviceOn={this.props.isDeviceOn}
              onHitTheGameSwitch={this.props.switchDeviceToggle}
            />
          </div>
          {/*
           <div className="dev-section">
            <button onClick={this.playSimonSequence}>Play Sequence</button>
            <button onClick={this.stopPlaySequence}>Stop Sequence</button>
            <button onClick={this.addToSequence}>Add to sequence</button>
            <button onClick={this.resetSequence}>Reset sequence</button>
            <div className="answer-check">
              {this.props.answerCheck}
            </div>
          </div>
          */}
        </div>
        <div className="simon-sound-actions">
          {sounds.map(sound => (
            <SimonButton
              isPlayable={!this.props.isPlaying && this.props.isDeviceOn && this.props.simonOrder.length !== 0}
              onButtonClickAction={this.handleButtonClickAction}
              key={sound.id}
              currentSoundId={this.props.currentSoundId}
              soundId={sound.id}
              audio={sound.audio}
              className={sound.className}
            />
          ))}
        </div>
      </div>
    );
  }
}

SimonDevice.propTypes = {
  simonOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
  simonOrderIndex: PropTypes.number.isRequired,
  currentSoundId: PropTypes.number,
  sequenceOrder: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isDeviceOn: PropTypes.bool.isRequired,
  answerCheck: PropTypes.string.isRequired,
  isCorrect: PropTypes.number.isRequired,
  isStrictMode: PropTypes.bool.isRequired,
  increaseSimonIndex: PropTypes.func.isRequired,
  resetSimonIndex: PropTypes.func.isRequired,
  currentPlaying: PropTypes.func.isRequired,
  addToSequence: PropTypes.func.isRequired,
  resetSequence: PropTypes.func.isRequired,
  repeatSequence: PropTypes.func.isRequired,
  startPlaySequence: PropTypes.func.isRequired,
  switchDeviceToggle: PropTypes.func.isRequired,
  strictModeToggle: PropTypes.func.isRequired,
};

SimonDevice.defaultProps = {
  currentSoundId: null,
};

function mapStateToProps(state) {
  return {
    answerCheck: state.answerCheck,
    isDeviceOn: state.isDeviceOn,
    sequenceOrder: state.sequenceOrder,
    simonOrder: state.simonOrder,
    simonOrderIndex: state.simonOrderIndex,
    isPlaying: state.isPlaying,
    isCorrect: state.isCorrect,
    isStrictMode: state.isStrictMode,
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
    startPlaySequence: bindActionCreators(startPlaySequence, dispatch),
    switchDeviceToggle: bindActionCreators(switchDeviceToggle, dispatch),
    strictModeToggle: bindActionCreators(strictModeToggle, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimonDevice);

