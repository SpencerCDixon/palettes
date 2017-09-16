import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { font, media } from '../styles';
import cn from 'classnames';

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: 8px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.06);
  &:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
  ${media.sm} { 
    width: 100px;
    height: 100px;
  }
  ${media.md} {
    width: 150px;
    height: 150px;
  }
`

const Color = styled.div`
  height: ${props => props.isLoading ? '90%' : '90%'};
  background: ${props => props.isLoading ? '' : props.color};
`

const Amount = styled.div`
  margin: 10px 0 0 10px;
  color: white;
  text-transform: uppercase;
  font-weight: 300;
  ${font.family};
`

const ColorCode = styled.div`
  text-transform: uppercase;
  color: black;
  font-weight: 300;
  font-size: 1em;
  ${font.family};
  ${media.md} {
    font-size: .75em;
  }
  ${font.ellipsis}
`

const BottomPanel = styled.div`
  border-top: 1px solid rgba(0,0,0,0.06);
  height: 10%;
  background: white;
  padding: 20px;
`

const LoadingColorCode = styled.div`
  height: 20px;
  width: 100%;
`

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
    const classes = cn(className, { "animated-background": isLoading });

    return (
      <Container className={classes} onClick={() => onClick(color)}>
        <Color isLoading={isLoading} color={color}>
          {!isLoading && (
            <Amount>
              {amount}
            </Amount>
          )}
        </Color>

        <BottomPanel>
          {isLoading ? (
            <LoadingColorCode className="animated-background" />
          ) : (
            <ColorCode> {color} </ColorCode>
          )}
        </BottomPanel>
      </Container>
    );
  }
}

export default Swatch;
