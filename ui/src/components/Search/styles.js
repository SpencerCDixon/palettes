import styled from 'styled-components'
import { reflex } from 'reflexbox';
import { flex } from '../../styles';

export const Input = styled.input`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  border: none;

  ::placeholder {
    color: #1C2B33;
  }
`

export const Container = reflex(styled.div`
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  width: 100%;
  background: white;
  ${flex.center}
`);

export const Emoji = styled.span`
  font-size: 1.5em;
  margin: 0 20px;
  &:hover {
    cursor: pointer;
  }
`
export const EmojiContainer = styled.a`
  ${flex.center}
  padding: 10px 0;
  &:hover {
    cursor: pointer;
  }
  &:focus {
  }
`
