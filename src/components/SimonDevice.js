import React, { Component } from 'react';
import SimonButton from './SimonButton';

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
//
const simonRand = () => Math.floor(Math.random() * sounds.length) + 1;


class SimonDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simonOrder: [1, 2, 3, 4, 2, 1, 3],
      simonOrderIndex: 0,
      timer: 0,
      isPlaying: false,
    };
    this.handleButtonClickAction = this.handleButtonClickAction.bind(this);
    this.playSimonSequence = this.playSimonSequence.bind(this);
    this.stopPlaySequence = this.stopPlaySequence.bind(this);
    this.playNext = this.playNext.bind(this);
  }

  handleButtonClickAction(soundId) {
    console.log(soundId);
  }

  playSimonSequence() {
    this.stopPlaySequence();
    this.setState({
      timer: setInterval(this.playNext, 1000),
    });
  }

  playNext() {
    const findSound = sounds.find(sound => (sound.id === this.state.simonOrder[this.state.simonOrderIndex]));
    console.log('play %d sequence', findSound.id);
    findSound.audio.play();
    this.setState({
      simonOrderIndex: this.state.simonOrderIndex + 1,
    });
    if (this.state.simonOrderIndex === this.state.simonOrder.length) {
      this.stopPlaySequence();
    }
  }

  stopPlaySequence() {
    clearInterval(this.state.timer);
    this.setState({
      timer: 0,
      simonOrderIndex: 0,
    });
  }

  render() {
    return (
      <div>
        <h1>Hit a button for sound</h1>
        <button onClick={this.playSimonSequence}>PlaySequence</button>
        <button onClick={this.stopPlaySequence}>StopSequence</button>
        {sounds.map(sound => (
          <SimonButton
            onButtonClickAction={this.handleButtonClickAction}
            key={sound.id}
            soundId={sound.id}
            audio={sound.audio}
            backgroud={sound.color}
          />
        ))}
      </div>
    );
  }
}

export default SimonDevice;
