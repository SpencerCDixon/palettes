import React, { Component } from 'react';
import Swatch from './components/Swatch.js';
import Search from './components/Search.js';
import styled from 'styled-components'
import { mock } from './mock.js';
import { ReflexProvider } from 'reflexbox';
import { font, media } from './styles';
import { Flex, Box } from 'reflexbox';
import FlipMove from 'react-flip-move';
import shuffle from 'lodash.shuffle';

const sx = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  ${media.sm} { width: 80%; }
  ${media.md} { width: 90%; }
  ${media.lg} { width: 100%; }
`

const Title = styled.h1`
  font-family: ${font.family};
  text-align: center;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 300;
`

class App extends Component {
  state = { 
    results: [],
    background: 'white',
  }

  componentDidMount() {
    this.setState({results: mock})
  }

  handleBackgroundChange = (background) => this.setState({background})
  shuffle = () => {
    this.setState({results: shuffle(this.state.results)});
  }

  render() {
    const { background } = this.state;
    return (
      <ReflexProvider>
        <div style={{background}}>
          <Flex mx="auto" w={[ 1, 7/8, 6/8 ]} column>
            <Title className="text-gradient">Palettes Generator</Title>
            
            <Box my={2}>
              <Search />
              <button onClick={this.shuffle}> shuffle </button>
            </Box>

            <Container>
              <FlipMove 
                duration={550} 
                enterAnimation="elevator" 
                leaveAnimation="elevator"
                style={sx}
              >
                {this.state.results.map(({color, count}) => (
                  <Swatch 
                    key={color}
                    onClick={this.handleBackgroundChange} 
                    color={color} 
                    amount={count} 
                  />
                ))}
              </FlipMove>
            </Container>
          </Flex>
        </div>
      </ReflexProvider>
    );
  }
}

export default App;
