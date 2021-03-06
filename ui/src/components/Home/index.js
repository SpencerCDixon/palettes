import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { flattenProp } from 'recompose';
import { Flex, Box } from 'reflexbox';

import { Container, Title, SubTitle } from './styles';
import { CommonSites, Swatch, ToolBar, Search } from '..';

const colorContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    searchValue: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
  }

  render() {
    const {
      background,
      isFetching,
      colors,
      searchValue,

      actions: {
        setBackground,
        setSearch,
        shuffle,
        fetchColors,
        setAndFetch,
      }
    } = this.props;

    return (
      <Container bg={background}>
        <Flex mx="auto" column>
          <Title my={[1,2,2]}>Palettes Generator</Title>
          <SubTitle my={[1, 2, 2]}>Discover the colors your favorite websites use</SubTitle>

          <ToolBar my={2}>
            <Search 
              onSubmit={fetchColors} 
              onChange={setSearch}
              onShuffle={shuffle}
              value={searchValue}
            />
            <Flex my={2}>
              <CommonSites onClick={setAndFetch} />
            </Flex>
          </ToolBar>

          <FlipMove 
            duration={550} 
            enterAnimation="elevator" 
            leaveAnimation="elevator"
            style={colorContainer}
          >
            {colors.map(({color, count}) => (
              <Swatch 
                key={color}
                onClick={setBackground} 
                color={color} 
                amount={count} 
                isLoading={isFetching}
              />
            ))}
          </FlipMove>
        </Flex>
      </Container>
    );
  }
}

export default flattenProp('homeState')(Home);
