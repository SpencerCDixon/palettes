import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Color, Amount, ColorCode, BottomPanel, LoadingColorCode  } from './styles';

class Swatch extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: false,
  }

  render() {
    const { className, color, amount, onClick, isLoading } = this.props;

    return (
      <Container isLoading={isLoading} onClick={() => onClick(color)}>
        <Color isLoading={isLoading} color={color}>
          {!isLoading && (
            <Amount>
              {amount}
            </Amount>
          )}
        </Color>

        <BottomPanel>
          {isLoading ? (
            <LoadingColorCode />
          ) : (
            <ColorCode> {color} </ColorCode>
          )}
        </BottomPanel>
      </Container>
    );
  }
}

export default Swatch;
