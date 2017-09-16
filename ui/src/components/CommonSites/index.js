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

const Container = ({children, to}) => (
  <Div tabIndex={0} mx={[2, null, null]} my={[1, null, null]}>
    {children}
  </Div>
)

const CommonSites = ({onClick}) => {
  return (
    <Flex style={{width: '100%'}} wrap justify="space-around">
      <Container>
        <IoSocialFacebook size={30} onClick={() => onClick('https://facebook.com')} />
      </Container>

      <Container>
        <IoSocialGithub size={30} onClick={() => onClick('https://github.com')} />
      </Container>

      <Container>
        <IoSocialApple size={30} onClick={() => onClick('https://apple.com')} />
      </Container>

      <Container>
        <IoSocialDropbox size={30} onClick={() => onClick('https://dropbox.com')} />
      </Container>

      <Container>
        <IoSocialTwitch size={30} onClick={() => onClick('https://twitch.tv')} />
      </Container>

      <Container>
        <IoSocialVimeo size={30} onClick={() => onClick('https://vimeo.com')} />
      </Container>

      <Container>
        <IoSocialWindows size={30} onClick={() => onClick('https://microsoft.com')} />
      </Container>

      <Container>
        <IoSocialYahoo size={30} onClick={() => onClick('https://yahoo.com')} />
      </Container>

      <Container>
        <IoSocialGoogle size={30} onClick={() => onClick('https://google.com')} />
      </Container>

      <Container>
        <IoSocialYoutube size={30} onClick={() => onClick('https://youtube.com')} />
      </Container>
    </Flex>
  );
};

export default CommonSites;
