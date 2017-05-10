import React, { Component } from 'react';
import SimonButton from './SimonButton';


// gen a number between 1-4
//

const sounds = [
  { id: 1, src: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', color: 'green' },
  { id: 2, src: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', color: 'red' },
  { id: 3, src: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', color: 'yellow' },
  { id: 4, src: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3', color: 'blue' },
].map((item) => {
  const { id, color, src } = item;
  return ({ id, color, audio: new Audio(src) });
});

const simonRand = () => Math.floor(Math.random() * sounds.length) + 1;
const timeouts = [];


class SimonDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simonOrder: [1, 2, 3, 4, 2, 1, 3],
    };
    this.handleButtonClickAction = this.handleButtonClickAction.bind(this);
    this.playSimonSequence = this.playSimonSequence.bind(this);
    this.payTimedSound = this.payTimedSound.bind(this);
  }

  handleButtonClickAction(soundId) {
    console.log(soundId);
  }

  payTimedSound(index, timeout) {
    timeouts.push(setTimeout(() => {
      const findSound = sounds.find(sound => (sound.id === this.state.simonOrder[index]));
      findSound.audio.play();
      console.log('play %d sequence', this.state.simonOrder[index]);
    }, timeout));
  }

  playSimonSequence() {
    for (let i = 0; i < this.state.simonOrder.length; i += 1) {
      this.payTimedSound(i, 1000 * i);
    }
  }

  stopPlaySequence() {
    timeouts.forEach((item) => {
      clearTimeout(item);
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
            audio={sound.audio} s
            backgroud={sound.color}
          />
        ))}
      </div>
    );
  }
}

export default SimonDevice;
