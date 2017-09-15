import React from 'react';
import styled from 'styled-components'
import { reflex, Flex, Box } from 'reflexbox';
import { flex, font } from '../styles';

const Input = styled.input`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  border: none;

  ::placeholder {
    color: #1C2B33;
  }
`

const Container = reflex(styled.div`
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  // border-radius: 3px;
  width: 100%;
  background: white;
  ${flex.center}
`);

const Emoji = styled.span`
  font-size: 1.5em;
  margin: 0 20px;
  &:hover {
    cursor: pointer;
  }
`
const EmojiContainer = styled.a`
  ${flex.center}
  padding: 10px 0;
  &:hover {
    cursor: pointer;
  }
  &:focus {
  }
`

const Search = ({onSubmit, value, onChange}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }

  return (
    <form>
      <Container>
        <Box auto>
          <Input 
            tabIndex={0} 
            placeholder="E.x. https://facebook.com" 
            value={value}
            onChange={onChange}
          />
        </Box>
        <EmojiContainer onClick={onSubmit} onKeyDown={handleKeyDown} tabIndex={0}>
          <Emoji>🎨</Emoji>
        </EmojiContainer>
      </Container>
    </form>
  );
}



export default Search;
