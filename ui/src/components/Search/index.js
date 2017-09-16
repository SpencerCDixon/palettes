import React from 'react';
import { Input, Container, Emoji, EmojiContainer } from './styles';
import { Box } from 'reflexbox';

const Search = ({onSubmit, value, onChange}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }
  const handleChange = (e) => onChange(e.target.value)
  const handleSubmit = (e) => {
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
      </Container>
    </form>
  );
}

export default Search;
