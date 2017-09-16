import React from 'react';
import { Flex, Box } from 'reflexbox';
import { 
  IoSocialFacebook,
  IoSocialGithub,
  IoSocialReddit,
  IoSocialApple,
  IoSocialDropbox,
  IoSocialTwitch,
  IoSocialVimeo,
  IoSocialWindows,
  IoSocialYahoo,
  IoSocialGoogle,
} from 'react-icons/lib/io';

const CommonSites = ({onClick}) => {
  return (
    <Flex>
      <Box mr={2}>
        <IoSocialFacebook size={30} onClick={() => onClick('https://facebook.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialGithub size={30} onClick={() => onClick('https://github.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialReddit size={30} onClick={() => onClick('https://reddit.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialApple size={30} onClick={() => onClick('https://apple.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialDropbox size={30} onClick={() => onClick('https://dropbox.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialTwitch size={30} onClick={() => onClick('https://twitch.tv')} />
      </Box>
      <Box mx={2}>
        <IoSocialVimeo size={30} onClick={() => onClick('https://vimeo.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialWindows size={30} onClick={() => onClick('https://microsoft.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialYahoo size={30} onClick={() => onClick('https://yahoo.com')} />
      </Box>
      <Box mx={2}>
        <IoSocialGoogle size={30} onClick={() => onClick('https://google.com')} />
      </Box>
    </Flex>
  );
};

export default CommonSites;
