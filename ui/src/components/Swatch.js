import React from 'react';
import styled from 'styled-components'

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
`

const Color = styled.div`
  height: 90%;
  background: ${props => props.color};
`

const Amount = styled.div`
  margin: 10px 0 0 10px;
  color: white;
  text-transform: uppercase;
  font-weight: 300;
`

const Identifier = styled.div`
  border-top: 1px solid rgba(0,0,0,0.06);
  text-transform: uppercase;
  color: black;
  background: white;
  padding: 20px;
  height: 10%;
  font-weight: bold;
`

const Swatch = ({color, amount, onClick}) => (
  <Container onClick={() => onClick(color)}>
    <Color color={color}>
      <Amount>
        {amount}
      </Amount>
    </Color>

    <Identifier>
      {color}
    </Identifier>
  </Container>
)

export default Swatch;
