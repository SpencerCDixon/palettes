import React from 'react';
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox';
import { font } from '../styles';

const Input = styled.input`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
`

const Button = styled.a`
  text-align: center;
  display: flex;
  align-items: center;
  border: 1px solid #1C2B33;
  box-sizing: border-box;
  padding: 0 12px;
  text-transform: uppercase;
  color: black;
  font-family: ${font.family}
  letter-spacing: 1px;
  line-height: 10px;
  height: 100%;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`

const Emoji = styled.span`
  font-size: 1.5em;
`

const Search = () => {
  return (
    <Flex>
      <Box mr={1} auto>
        <Input />
      </Box>
      <Box ml={1}>
        <Button>
          Create &nbsp; <Emoji>🎨</Emoji>
        </Button>
      </Box>
    </Flex>
  );
}



export default Search;
