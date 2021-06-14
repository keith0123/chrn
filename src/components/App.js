import React, { Component } from 'react';
import '../styles/App.scss';
import ApiCalls from 'components/ApiCalls.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
    };

  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <div className="logoBox">
            <svg className="logoSvg" viewBox="0 0 100 30" preserveAspectRatio="xMaxYMax meet">
              <text x="50" y="20" textAnchor="middle" className="logo neon-flicker">chrn</text>
            </svg>
          </div>
        </header>
            <div className="List">
              <ApiCalls />
            </div>
      </div>
    );
  }
}

export default App;
