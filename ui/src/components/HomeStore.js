import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import qs from 'qs';
import { mockColors, getColors } from '../util';
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
      this.setState({searchValue: params.url}, this.fetchColors);
    } else {
      this.setState({colors: mockColors});
    }
  }

  setSearch = searchValue => this.setState({searchValue})

  setBackground = background => this.setState({background})

  shuffle = () => {
    this.setState({results: shuffle(this.state.results)});
  }

  fetchColors = () => {
    this.setState({isFetching: true});
    getColors({url: this.state.searchValue})
      .then(({data}) => {
        this.setState({colors: data, isFetching: false, searchValue: ''});
      })
      .catch(() => {
        this.setState({isFetching: false, searchValue: ''});
      })
  }


  render() {
    const actions = {
      setSearch: this.setSearch,
      setBackground: this.setBackground,
      shuffle: this.shuffle,
      fetchColors: this.fetchColors,
    };

    return <Home actions={actions} homeState={this.state} />
  }
}

export default HomeStore;
