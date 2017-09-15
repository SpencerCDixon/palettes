import React, { Component } from 'react';
import Swatch from './components/Swatch.js';
import Search from './components/Search.js';
import styled from 'styled-components'
import { mock } from './mock.js';
import { ReflexProvider } from 'reflexbox';
import { font, media } from './styles';
import { Flex, Box } from 'reflexbox';

const Container = styled.div`
  display: flex;
  width: 90%;
  min-height: 100vh;
  background: ${props => props.bg};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
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

  render() {
    return (
      <ReflexProvider>
        <Flex style={{margin: '0 auto'}} w={[ 1, 7/8, 6/8 ]} column>
          <Title className="text-gradient">Palettes Generator</Title>
          
          <Box my={2}>
            <Search />
          </Box>

          <Container bg={this.state.background}>
            {this.state.results.map(({color, count}) => (
              <Swatch 
                onClick={this.handleBackgroundChange} 
                color={color} 
                amount={count} 
              />
            ))}
          </Container>
        </Flex>
      </ReflexProvider>
    );
  }
}

export default App;
