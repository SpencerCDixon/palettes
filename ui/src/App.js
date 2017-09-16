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
          <GithubCorner href="TODO" />
        </div>
      </ReflexProvider>
    );
  }
}

export default App;
