import {
  RESET_SIMON_ORDER,
  INCREASE_SIMON_INDEX,
  RESET_SIMON_INDEX,
  CURRENT_PLAYING,
  ADD_SIMON_SEQUENCE,
} from '../reducers/SimonReducer';

export function currentPlaying(id = 0) {
  return {
    type: CURRENT_PLAYING,
    payload: id,
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
