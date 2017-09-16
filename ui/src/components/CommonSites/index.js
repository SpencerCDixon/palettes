import React from 'react';
import { reflex, Flex } from 'reflexbox';
import styled from 'styled-components'
import { 
  IoSocialFacebook,
  IoSocialGithub,
  IoSocialApple,
  IoSocialDropbox,
  IoSocialTwitch,
  IoSocialVimeo,
  IoSocialWindows,
  IoSocialYahoo,
  IoSocialGoogle,
  IoSocialYoutube,
} from 'react-icons/lib/io';

const Div = reflex(styled.div`
  padding: 8px 10px;
  border-radius: 3px;
  &:hover {
    background: rgba(0,0,0,0.08);
    cursor: pointer;
  }
`);

const Container = ({children, onClick, to}) => {
  const handleClick = () => onClick(to);
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      onClick(to)
    }
  }

  return (
    <Div 
      tabIndex={0} 
      mx={[2, null, null]} 
      my={[1, null, null]}
      onClick={handleClick}
      onKeyDown={handleEnter}
    >
      {children}
    </Div>
  );
};

const CommonSites = ({onClick}) => {
  return (
    <Flex style={{width: '100%'}} wrap justify="space-around">
      <Container onClick={onClick} to='facebook.com'>
        <IoSocialFacebook size={30}/>
      </Container>

      <Container onClick={onClick} to='github.com'>
        <IoSocialGithub size={30} />
      </Container>

      <Container onClick={onClick} to='apple.com'>
        <IoSocialApple size={30} />
      </Container>

      <Container onClick={onClick} to='dropbox.com'>
        <IoSocialDropbox size={30} />
      </Container>

      <Container onClick={onClick} to='twitch.tv'>
        <IoSocialTwitch size={30} />
      </Container>

      <Container onClick={onClick} to='vimeo.com'>
        <IoSocialVimeo size={30} />
      </Container>

      <Container onClick={onClick} to='microsoft.com'>
        <IoSocialWindows size={30} />
      </Container>

      <Container onClick={onClick} to='yahoo.com'>
        <IoSocialYahoo size={30} />
      </Container>

      <Container onClick={onClick} to='google.com'>
        <IoSocialGoogle size={30} />
      </Container>

      <Container onClick={onClick} to='youtube.com'>
        <IoSocialYoutube size={30} />
      </Container>
    </Flex>
  );
};

export default CommonSites;
