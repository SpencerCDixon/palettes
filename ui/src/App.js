import React, { Component } from 'react';
import Swatch from './components/Swatch.js';
import Search from './components/Search.js';
import styled from 'styled-components'
import { mock } from './mock.js';
import { ReflexProvider } from 'reflexbox';
import { media } from './styles';
import { Flex, Box } from 'reflexbox';
import Grow from './components/Grow.js';

const Container = styled.div`
  display: flex;
  width: 90%;
  min-height: 100vh;
  background: ${props => props.bg};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  ${media.sm} { width: 90%; }
  ${media.md} { width: 80%; }
  ${media.lg} { width: 80%; }
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
        <Flex column>
          <Grow />
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
