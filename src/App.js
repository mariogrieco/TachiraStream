import React, { Component } from 'react';
import Header from './components/Header';
import TweetCard from './components/TweetCard';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='App-Header-main'></div>
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <Header />
        <p className="App-intro">
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
        </p>
      </div>
    );
  }
}

export default App;
