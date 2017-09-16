import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import qs from 'qs';
import { normalizeProtocol, mockColors, getColors } from '../util';
import Home from './Home';

class HomeStore extends Component {
  state = {
    colors: [],
    background: '#FAFAFA',
    isFetching: false,
    searchValue: '',
  }

  componentDidMount() {
    const queryString = window.location.href.split('?')[1]
    const params = qs.parse(queryString);
    if (params.url) {
      this.setAndFetch(params.url);
    } else {
      this.setState({colors: mockColors});
    }
  }

  setSearch = searchValue => this.setState({searchValue})

  setBackground = background => this.setState({background})

  shuffle = () => {
    this.setState({colors: shuffle(this.state.colors)});
  }

  fetchColors = () => {
    this.setState({isFetching: true});
    const url = normalizeProtocol(this.state.searchValue);

    getColors({url})
      .then(({data}) => {
        this.setState({colors: data, isFetching: false, searchValue: ''});
      })
      .catch(() => {
        this.setState({isFetching: false, searchValue: ''});
      })
  }

  setAndFetch = url => {
    this.setState({searchValue: url}, this.fetchColors);
  }

  render() {
    const actions = {
      setSearch: this.setSearch,
      setBackground: this.setBackground,
      shuffle: this.shuffle,
      fetchColors: this.fetchColors,
      setAndFetch: this.setAndFetch,
    };

    return <Home actions={actions} homeState={this.state} />
  }
}

export default HomeStore;
