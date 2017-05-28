import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO cool snippet, make a helper
const lpad = str => (`0${str}`).substring(str.length);

class NumbersDisplay extends Component {
  render() {
    return (
      <div className="display-numbers-container">
        <div className="display-numbers">{lpad(this.props.displayNumber)}</div>
        <div className="display-numbers-caption">count</div>
      </div>
    );
  }
}

NumbersDisplay.propTypes = {
  displayNumber: PropTypes.number.isRequired,
};

export default NumbersDisplay;

