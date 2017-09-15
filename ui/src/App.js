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
import ToolBar from './components/ToolBar.js';
import GithubCorner from 'react-github-corner';
import Button from './components/Button';
import { Shuffle } from 'react-feather';
import { getColors } from './util/api.js';

const sx = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}

const Container = styled.div`
  // width: 90%;
  // min-height: 100vh;
  // margin: 0 auto;
  // ${media.sm} { width: 80%; }
  // ${media.md} { width: 90%; }
  // ${media.lg} { width: 100%; }
`

const Title = styled.h1`
  ${font.family};
  text-align: center;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 300;
`

const SubTitle = styled.h3`
  ${font.family};
  text-align: center;
  letter-spacing: 3px;
  text-tansform: uppercase;
  color: black;
  font-weight: 100;
  margin: 0 0 20px 0;
`

class App extends Component {
  state = { 
    results: [],
    background: '#FAFAFA',
    isLoading: false,
    search: '',
  }

  componentDidMount() {
    this.setState({results: mock})
  }

  handleBackgroundChange = (background) => this.setState({background})

  shuffle = () => {
    this.setState({results: shuffle(this.state.results)});
  }

  handleSubmit = () => {
    // go fetch new stuff
    this.setState({isLoading: true})
    getColors({url: this.state.search})
      .then(({data}) => {
        this.setState({results: data, isLoading: false, search: ''});
      })
      .catch(() => {
        this.setState({isLoading: false, search: ''});
      })
  }

  changeSearch = e => this.setState({
    search: e.target.value
  })

  render() {
    const { search, isLoading, background } = this.state;

    return (
      <ReflexProvider>
        <div style={{background}}>
          <Flex mx="auto" w={[ 1, 7/8, 6/8 ]} column>
            <Title className="text-gradient">Palettes Generator</Title>
            <SubTitle>Discover the colors your favorite companies use</SubTitle>
            
            <ToolBar my={2}>
              <Search 
                onSubmit={this.handleSubmit} 
                onChange={this.changeSearch}
                value={search}
              />
              <Flex my={2}>
                <Button tabIndex={0} onClick={this.shuffle}>
                  <Shuffle /> &nbsp; shuffle
                </Button>
              </Flex>
            </ToolBar>

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
                    isLoading={isLoading}
                  />
                ))}
              </FlipMove>
            </Container>
          </Flex>
          <GithubCorner href="TODO" />
        </div>
      </ReflexProvider>
    );
  }
}

export default App;
