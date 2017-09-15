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
  box-sizing: border-box;
  padding: 0 12px;
  text-transform: uppercase;
  color: black;
  letter-spacing: .5px;
  font-family: ${font.family};
  height: 100%;
  width: 100%;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(90deg, #f79533 0%, #f37055 15%, #ef4e7b 30%, #a166ab 44%, #5073b8 58%, #1098ad 72%, #07b39b 86%, #6dba82 100%) 1 1;

  &:hover {
    cursor: pointer;
    color: white;
    background: linear-gradient(90deg, #f79533 0%, #f37055 15%, #ef4e7b 30%, #a166ab 44%, #5073b8 58%, #1098ad 72%, #07b39b 86%, #6dba82 100%);
  }
`

const Emoji = styled.span`
  font-size: 1.5em;
`

const Search = () => {
  return (
    <Flex>
      <Box mr={1} auto>
        <Input placeholder="E.x. https://facebook.com" />
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
