import React, { Component } from 'react';
import { ReflexProvider } from 'reflexbox';
import GithubCorner from 'react-github-corner';
import HomeStore from './components/HomeStore.js';

class App extends Component {
  render() {
    return (
      <ReflexProvider>
        <div>
          <HomeStore />
          <GithubCorner href="https://github.com/SpencerCDixon/palettes" />
        </div>
      </ReflexProvider>
    );
  }
}

export default App;
