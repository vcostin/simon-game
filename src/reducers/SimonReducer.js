const [CORRECT, INCORRECT, UNDECIDED] = [1, 2, 3];

const ADD_SIMON_SEQUENCE = 'ADD_SIMON_SEQUENCE';
const RESET_SIMON_ORDER = 'RESET_SIMON_ORDER';
const INCREASE_SIMON_INDEX = 'INCREASE_SIMON_INDEX';
const RESET_SIMON_INDEX = 'RESET_SIMON_INDEX';
const CURRENT_PLAYING = 'CURRENT_PLAYING';
const REPEAT_SEQUENCE = 'REPEAT_SEQUENCE';
const START_PLAY_SEQUENCE = 'START_PLAY_SEQUENCE';
const SWITCH_DEVICE_TOGGLE = 'SWITCH_DEVICE_TOGGLE';

const defaultState = {
  simonOrder: [],
  simonOrderIndex: 0,
  isPlaying: false,
  currentSoundId: null,
  sequenceOrder: 0,
  answerCheck: '',
  isCorrect: UNDECIDED,
  sequenceSoundId: 0,
  isDeviceOn: false,
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
        answerCheck: '',
      });
    case RESET_SIMON_ORDER:
      return Object.assign({}, state, {
        simonOrder: [],
        simonOrderIndex: 0,
        sequenceOrder: 0,
        isCorrect: UNDECIDED,
        answerCheck: '',
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
        // TODO this is a compute value, implement a selector
        answerCheck: isCorrect ? 'Correct' : 'Incorrect',
      });
    }
    case START_PLAY_SEQUENCE:
      return Object.assign({}, state, {
        sequenceOrder: 0,
        isCorrect: UNDECIDED,
        isPlaying: true,
        currentSoundId: null,
      });
    case SWITCH_DEVICE_TOGGLE:
      return Object.assign({}, state, {
        isDeviceOn: !state.isDeviceOn,
      });
    default:
      return state;
  }
}

export default SimonOrderReducer;

export {
  ADD_SIMON_SEQUENCE,
  RESET_SIMON_ORDER,
  INCREASE_SIMON_INDEX,
  RESET_SIMON_INDEX,
  CURRENT_PLAYING,
  REPEAT_SEQUENCE,
  START_PLAY_SEQUENCE,
  SWITCH_DEVICE_TOGGLE,
  CORRECT,
  INCORRECT,
  UNDECIDED,
};
