import React from 'react';
import styled from 'styled-components'
import { flex, font } from '../styles';

const Button = styled.a`
  ${flex.center}
  ${font.family};
  text-align: center;
  box-sizing: border-box;
  padding: 8px 12px;
  text-transform: uppercase;
  color: black;
  letter-spacing: .5px;
  height: 100%;

  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(90deg, #f79533 0%, #f37055 15%, #ef4e7b 30%, #a166ab 44%, #5073b8 58%, #1098ad 72%, #07b39b 86%, #6dba82 100%) 1 1;

  &:hover {
    cursor: pointer;
    color: white;
    background: linear-gradient(90deg, #f79533 0%, #f37055 15%, #ef4e7b 30%, #a166ab 44%, #5073b8 58%, #1098ad 72%, #07b39b 86%, #6dba82 100%);
  }
`

export default Button;
