import React, {Component} from 'react';

class SimonButton extends Component {
  constructor(props) {
    super(props);
    this.handlePlaySound = this.handlePlaySound.bind(this);
  }

  handlePlaySound() {
    const { audio } = this.props;
    // this.audio.pause();
    audio.currentTime = 0;
    audio.play();
    this.props.onButtonClickAction(this.props.soundId);
  }

  render() {
    return (<div>
      <button onClick={this.handlePlaySound} style={{ backgroundColor: this.props.backgroud }}>PLAY!!!</button>
    </div>);
  }
}

export default SimonButton;
