import {
  RESET_SIMON_ORDER,
  INCREASE_SIMON_INDEX,
  RESET_SIMON_INDEX,
  CURRENT_PLAYING,
  ADD_SIMON_SEQUENCE,
  REPEAT_SEQUENCE,
  START_PLAY_SEQUENCE,
  SWITCH_DEVICE_TOGGLE,
} from '../reducers/SimonReducer';

export function currentPlaying(soundId = 0) {
  return {
    type: CURRENT_PLAYING,
    payload: soundId,
  };
}

export function resetSimonIndex() {
  return {
    type: RESET_SIMON_INDEX,
  };
}

export function resetSequence() {
  return {
    type: RESET_SIMON_ORDER,
  };
}

export function increaseSimonIndex() {
  return {
    type: INCREASE_SIMON_INDEX,
  };
}

export function addToSequence(soundId) {
  return {
    type: ADD_SIMON_SEQUENCE,
    payload: soundId,
  };
}

export function repeatSequence(sequenceOrder) {
  return {
    type: REPEAT_SEQUENCE,
    payload: {
      sequenceOrder,
    },
  };
}

export function startPlaySequence() {
  return {
    type: START_PLAY_SEQUENCE,
  };
}

export function switchDeviceToggle() {
  return {
    type: SWITCH_DEVICE_TOGGLE,
  };
}
