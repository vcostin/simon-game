import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimonStrictButton extends Component {

  isStrictModeActive() {
    return this.props.isStrictModeActive ? 'active' : '';
  }

  render() {
    return (
      <div className="strict-button-container">
        <div className={`strict-mode-indicator ${this.isStrictModeActive()}`}/>
        <div className="strict-button-wrapper">
          <button className="strict-button" onClick={this.props.onToggleStrictMode}/>
        </div>
        <div className="strict-button-caption">strict</div>
      </div>
    );
  }
}

SimonStrictButton.propTypes = {
  onToggleStrictMode: PropTypes.func.isRequired,
  isStrictModeActive: PropTypes.bool.isRequired,
};

export default SimonStrictButton;
