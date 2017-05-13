const defaultState = {
  simonOrder: [],
  simonOrderIndex: 0,
  isPlaying: false,
  currentSoundId: null,
};

const ADD_SIMON_SEQUENCE = 'ADD_SIMON_SEQUENCE';
const RESET_SIMON_ORDER = 'RESET_SIMON_ORDER';
const INCREASE_SIMON_INDEX = 'INCREASE_SIMON_INDEX';
const RESET_SIMON_INDEX = 'RESET_SIMON_INDEX';
const CURRENT_PLAYING = 'CURRENT_PLAYING';

function SimonOrderReducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_PLAYING:
      return Object.assign({}, state, {
        currentSoundId: action.payload,
      });
    case ADD_SIMON_SEQUENCE:
      return Object.assign({}, state, {
        simonOrder: [...state.simonOrder, action.payload],
      });
    case RESET_SIMON_ORDER:
      return Object.assign({}, state, {
        simonOrder: [],
        simonOrderIndex: 0,
      });
    case INCREASE_SIMON_INDEX:
      return Object.assign({}, state, {
        simonOrderIndex: state.simonOrderIndex + 1,
      });
    case RESET_SIMON_INDEX:
      return Object.assign({}, state, {
        simonOrderIndex: 0,
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
};
