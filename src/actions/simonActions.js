import {
  RESET_SIMON_ORDER,
  INCREASE_SIMON_INDEX,
  RESET_SIMON_INDEX,
  CURRENT_PLAYING,
  ADD_SIMON_SEQUENCE,
  REPEAT_SEQUENCE,
  START_PLAY_SEQUENCE,
  SWITCH_DEVICE_TOGGLE,
  STRICT_MODE_TOGGLE,
  USER_WON,
} from '../reducers/SimonReducer';

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

export {
  currentPlaying,
  resetSimonIndex,
  resetSequence,
  increaseSimonIndex,
  addToSequence,
  repeatSequence,
  startPlaySequence,
  switchDeviceToggle,
  strictModeToggle,
  userWin,
}
