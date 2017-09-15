import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

const sx = {
  background: 'yellow',
}

class Grow extends Component {
  state = { clicked: false }

  handleClick = () => this.setState({clicked: true})

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({clicked: true}), 300)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { width, height } = this.props;
    const { clicked } = this.state;

    return (
      <Motion 
        defaultStyle={{w: 10, h: 10}} 
        style={{
          w: clicked ? spring(100) : 0, 
          h: clicked ? spring(100) : 0,
        }}
      >
        {({w, h}) => (
          <div style={{...sx, height: h, width: w}}>
            growing
          </div>
        )}
      </Motion>
    );
  }
}

export default Grow;
