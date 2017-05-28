import React, { Component } from 'react';
import PropTypes from 'prop-types';

const [ON, OFF] = ['ON', 'OFF'];

class SimonOnOffSwitch extends Component {
  deviceStatus() {
    return this.props.isDeviceOn ? ON : OFF;
  }

  render() {
    return (
      <div className="switch-button-container">
        <div className="switch-button-wrapper">
          <button className="switch-button" onClick={this.props.onHitTheGameSwitch} />
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

export default SimonOnOffSwitch;
