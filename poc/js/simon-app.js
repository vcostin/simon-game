const { Component } = React;
const { bindActionCreators } = Redux;
const [CORRECT, INCORRECT, UNDECIDED] = [1, 2, 3];
const [ON, OFF] = ['ON', 'OFF'];

const TIMER_TIME = 500;
const STEPS_TO_WIN = 20;

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

const lpad = str => (`0${str}`).substring(str.length);

const ADD_SIMON_SEQUENCE = 'ADD_SIMON_SEQUENCE';
const RESET_SIMON_ORDER = 'RESET_SIMON_ORDER';
const INCREASE_SIMON_INDEX = 'INCREASE_SIMON_INDEX';
const RESET_SIMON_INDEX = 'RESET_SIMON_INDEX';
const CURRENT_PLAYING = 'CURRENT_PLAYING';
const REPEAT_SEQUENCE = 'REPEAT_SEQUENCE';
const START_PLAY_SEQUENCE = 'START_PLAY_SEQUENCE';
const SWITCH_DEVICE_TOGGLE = 'SWITCH_DEVICE_TOGGLE';
const STRICT_MODE_TOGGLE = 'STRICT_MODE_TOGGLE';
const USER_WON = 'USER_WAN';

const defaultState = {
  simonOrder: [],
  simonOrderIndex: 0,
  isPlaying: false,
  currentSoundId: 0,
  sequenceOrder: 0,
  isCorrect: UNDECIDED,
  sequenceSoundId: 0,
  isDeviceOn: false,
  isStrictMode: false,
  hasUserWon: false,
};

function SimonOrderReducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_PLAYING:
      return Object.assign({}, state, {
        currentSoundId: action.payload,
      });
    case ADD_SIMON_SEQUENCE:
      return Object.assign({}, state, {
        simonOrder: [...state.simonOrder, action.payload],
        sequenceOrder: 0,
        isCorrect: UNDECIDED,
      });
    case RESET_SIMON_ORDER:
      return Object.assign({}, state, {
        simonOrder: [],
        simonOrderIndex: 0,
        sequenceOrder: 0,
        isCorrect: UNDECIDED,
        hasUserWon: false,
      });
    case INCREASE_SIMON_INDEX:
      return Object.assign({}, state, {
        simonOrderIndex: state.simonOrderIndex + 1,
      });
    case RESET_SIMON_INDEX:
      return Object.assign({}, state, {
        simonOrderIndex: 0,
        isPlaying: false,
      });
    case REPEAT_SEQUENCE: {
      // TODO implement this logic in a selector
      const isCorrect = state.simonOrder[action.payload.sequenceOrder - 1] === state.currentSoundId;
      return Object.assign({}, state, {
        sequenceOrder: action.payload.sequenceOrder,
        isCorrect: isCorrect ? CORRECT : INCORRECT,
      });
    }
    case START_PLAY_SEQUENCE:
      return Object.assign({}, state, {
        sequenceOrder: 0,
        isCorrect: UNDECIDED,
        isPlaying: true,
        currentSoundId: 0,
      });
    case SWITCH_DEVICE_TOGGLE:
      return Object.assign({}, state, {
        isDeviceOn: !state.isDeviceOn,
      });
    case STRICT_MODE_TOGGLE:
      return Object.assign({}, state, {
        isStrictMode: !state.isStrictMode,
      });
    case USER_WON:
      return Object.assign({}, state, {
        hasUserWon: true,
      });
    default:
      return state;
  }
}
// actions
function currentPlaying(soundId = 0) {
  return {
    type: CURRENT_PLAYING,
    payload: soundId,
  };
}

function resetSimonIndex() {
  return {
    type: RESET_SIMON_INDEX,
  };
}

function resetSequence() {
  return {
    type: RESET_SIMON_ORDER,
  };
}

function increaseSimonIndex() {
  return {
    type: INCREASE_SIMON_INDEX,
  };
}

function addToSequence(soundId) {
  return {
    type: ADD_SIMON_SEQUENCE,
    payload: soundId,
  };
}

function repeatSequence(sequenceOrder) {
  return {
    type: REPEAT_SEQUENCE,
    payload: {
      sequenceOrder,
    },
  };
}

function startPlaySequence() {
  return {
    type: START_PLAY_SEQUENCE,
  };
}

function switchDeviceToggle() {
  return {
    type: SWITCH_DEVICE_TOGGLE,
  };
}

function strictModeToggle() {
  return {
    type: STRICT_MODE_TOGGLE,
  };
}

function userWin() {
  return {
    type: USER_WON,
  };
}

// components
class NumbersDisplay extends Component {
  render() {
    return (
      <div className="display-numbers-container">
        <div className="display-numbers">{lpad(this.props.displayNumber)}</div>
        <div className="display-numbers-caption">count</div>
      </div>
    );
  }
}

NumbersDisplay.propTypes = {
  displayNumber: PropTypes.number.isRequired,
};


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

class SimonOnOffSwitch extends Component {
  deviceStatus() {
    return this.props.isDeviceOn ? ON : OFF;
  }

  render() {
    return (
      <div className="switch-button-container">
        <div className="switch-button-wrapper">
          <button className="action-button switch-button" onClick={this.props.onHitTheGameSwitch} />
        </div>
        <div className="switch-button-caption">{this.deviceStatus()}</div>
      </div>
    );
  }
}

SimonOnOffSwitch.propTypes = {
  onHitTheGameSwitch: PropTypes.func.isRequired,
  isDeviceOn: PropTypes.bool.isRequired,
};

class SimonStartButton extends Component {
  render() {
    return (
      <div className="start-button-container">
        <div className="start-button-wrapper">
          <button className="action-button start-button" onClick={this.props.onStartButtonClick} />
        </div>
        <div className="start-button-caption">start</div>
      </div>
    );
  }
}

SimonStartButton.propTypes = {
  onStartButtonClick: PropTypes.func.isRequired,
};

class SimonStrictButton extends Component {

  isStrictModeActive() {
    return this.props.isStrictModeActive ? 'active' : '';
  }

  render() {
    return (
      <div className="strict-button-container">
        <div className={`strict-mode-indicator ${this.isStrictModeActive()}`} />
        <div className="strict-button-wrapper">
          <button className="action-button strict-button" onClick={this.props.onToggleStrictMode} />
        </div>
        <div className="strict-button-caption">strict</div>
      </div>
    );
  }
}

SimonStrictButton.propTypes = {
  onToggleStrictMode: PropTypes.func.isRequired,
  isStrictModeActive: PropTypes.bool.isRequired,
};

class WinnMessage extends Component {
  render() {
    if (!this.props.hasUserWon) {
      return null;
    }
    return (
      <div className="winner">
        <div className="winner-message">
          <p>Congratulations You have WON The Game, Your memory is extraordinary!!!</p>
          <p>Thank You for Playing!!!</p>
          <p>If You want to play again just turn of and on the device.</p>
          <p>made by vcostin</p>
        </div>
      </div>
    );
  }
}

WinnMessage.propTypes = {
  hasUserWon: PropTypes.bool.isRequired,
};

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
      if (this.props.simonOrder.length === STEPS_TO_WIN) {
        this.props.userWin();
        this.props.currentPlaying();
        return;
      }
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
    if (!this.props.isDeviceOn || this.props.hasUserWon) {
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
    if (!this.props.isDeviceOn || this.props.hasUserWon) {
      return;
    }
    this.props.strictModeToggle();
  }

  render() {
    return (
      <div>
        <WinnMessage hasUserWon={this.props.hasUserWon} />
        <div className="simon-device">
          <div className="simon-control-actions">
            <div className="simon-control-row">
              <div className="simon-control-header">
                <h1 className="simon-title">Simon<sup>&reg;</sup></h1>
              </div>
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
          </div>
          <div className="simon-sound-actions">
            {sounds.map(sound => (
              <SimonButton
                isPlayable={
                  !this.props.isPlaying &&
                  this.props.isDeviceOn &&
                  this.props.simonOrder.length !== 0 &&
                  !this.props.hasUserWon
                }
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
      </div>
    );
  }
}

SimonDevice.propTypes = {
  simonOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
  simonOrderIndex: PropTypes.number.isRequired,
  currentSoundId: PropTypes.number.isRequired,
  sequenceOrder: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isDeviceOn: PropTypes.bool.isRequired,
  isCorrect: PropTypes.number.isRequired,
  isStrictMode: PropTypes.bool.isRequired,
  hasUserWon: PropTypes.bool.isRequired,
  increaseSimonIndex: PropTypes.func.isRequired,
  resetSimonIndex: PropTypes.func.isRequired,
  currentPlaying: PropTypes.func.isRequired,
  addToSequence: PropTypes.func.isRequired,
  resetSequence: PropTypes.func.isRequired,
  repeatSequence: PropTypes.func.isRequired,
  startPlaySequence: PropTypes.func.isRequired,
  switchDeviceToggle: PropTypes.func.isRequired,
  strictModeToggle: PropTypes.func.isRequired,
  userWin: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isDeviceOn: state.isDeviceOn,
    sequenceOrder: state.sequenceOrder,
    simonOrder: state.simonOrder,
    simonOrderIndex: state.simonOrderIndex,
    isPlaying: state.isPlaying,
    isCorrect: state.isCorrect,
    isStrictMode: state.isStrictMode,
    hasUserWon: state.hasUserWon,
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
    userWin: bindActionCreators(userWin, dispatch),
  };
}

const { Provider } = ReactRedux;
const Device = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SimonDevice);
const store = Redux.createStore(SimonOrderReducer);

ReactDOM.render(
  <Provider store={store}>
    <Device />
  </Provider>,
  document.getElementById('root'),
);
