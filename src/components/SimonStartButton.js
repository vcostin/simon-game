import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimonStartButton extends Component {
  render() {
    return (
      <div className="start-button-container">
        <div className="start-button-wrapper">
          <button className="action-button start-button" onClick={this.props.onStartButtonClick}/>
        </div>
        <div className="start-button-caption">start</div>
      </div>
    );
  }
}

SimonStartButton.propTypes = {
  onStartButtonClick: PropTypes.func.isRequired,
};

export default SimonStartButton;
