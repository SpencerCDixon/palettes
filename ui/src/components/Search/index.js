import React from 'react';
import { ShuffleContainer, Input, Container, Emoji, EmojiContainer } from './styles';
import { Box } from 'reflexbox';
import { IoShuffle } from 'react-icons/lib/io';

function onEnter(fn) {
  return e => {
    if (e.keyCode === 13) fn();
  }
}

const Search = ({onShuffle, onSubmit, value, onChange}) => {
  const handleKeyDown = onEnter(onSubmit)
  const handleShuffle = onEnter(onShuffle)
  const handleChange  = (e) => onChange(e.target.value)
  const handleSubmit  = (e) => {
    e.preventDefault()
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Box auto>
          <Input 
            tabIndex={0} 
            placeholder="E.x. https://facebook.com" 
            value={value}
            onChange={handleChange}
          />
        </Box>

        <EmojiContainer onClick={onSubmit} onKeyDown={handleKeyDown} tabIndex={0}>
          <Emoji role="img">🎨</Emoji>
        </EmojiContainer>

        <ShuffleContainer onClick={onShuffle} onKeyDown={handleShuffle} tabIndex={0}>
          <IoShuffle size={25} />
        </ShuffleContainer>
      </Container>
    </form>
  );
}

export default Search;
