const defaultState = {
  simonOrder: [],
  simonOrderIndex: 0,
  isPlaying: false,
  currentSoundId: null,
  sequenceOrder: 0,
};

const ADD_SIMON_SEQUENCE = 'ADD_SIMON_SEQUENCE';
const RESET_SIMON_ORDER = 'RESET_SIMON_ORDER';
const INCREASE_SIMON_INDEX = 'INCREASE_SIMON_INDEX';
const RESET_SIMON_INDEX = 'RESET_SIMON_INDEX';
const CURRENT_PLAYING = 'CURRENT_PLAYING';
const REPEAT_SEQUENCE = 'REPEAT_SEQUENCE';
const CHECK_REPEAT_SEQUENCE = 'CHECK_REPEAT_SEQUENCE';
const START_PLAY_SEQUENCE = 'START_PLAY_SEQUENCE';

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
        isCorrect: undefined,
      });
    case RESET_SIMON_ORDER:
      return Object.assign({}, state, {
        simonOrder: [],
        simonOrderIndex: 0,
        sequenceOrder: 0,
        isCorrect: undefined,
      });
    case INCREASE_SIMON_INDEX:
      return Object.assign({}, state, {
        simonOrderIndex: state.simonOrderIndex + 1,
      });
    case RESET_SIMON_INDEX:
      return Object.assign({}, state, {
        simonOrderIndex: 0,
      });
    case REPEAT_SEQUENCE:
      return Object.assign({}, state, {
        sequenceOrder: action.payload.sequenceOrder,
        sequenceSoundId: action.payload.sequenceSoundId,
        isCorrect: state.simonOrder[action.payload.sequenceOrder - 1] === action.payload.sequenceSoundId,
      });
    case CHECK_REPEAT_SEQUENCE:
      return Object.assign({}, state, {
        isCorrect: state.simonOrder[state.sequenceOrder] === state.sequenceSoundId,
      });
    case START_PLAY_SEQUENCE:
      return Object.assign({}, state, {
        sequenceOrder: 0,
        isCorrect: undefined,
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
  CHECK_REPEAT_SEQUENCE,
  START_PLAY_SEQUENCE,
};
