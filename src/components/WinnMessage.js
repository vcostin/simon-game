import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WinnMessage extends Component {
  render() {
    if (!this.props.hasUserWon) {
      return null;
    }
    return (
      <div className="winner">
        <div className="winner-message">
          <p>Congratulations You have WON The Game, Your memory is extraordinary!!!</p>
          <p>Thank You for Playing!!!</p>
          <p>If You want to play again just turn of and on the device.</p>
          <p>made by vcostin</p>
        </div>
      </div>
    );
  }
}

WinnMessage.propTypes = {
  hasUserWon: PropTypes.bool.isRequired,
};
export default WinnMessage;
