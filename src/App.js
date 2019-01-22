import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      subreddits: [],
      items: []
    };
  }

  componentDidMount() {
    fetch("https://www.reddit.com/subreddits/popular/.json")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)

          this.setState({
            subreddits: result.data.children
          });

        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    const{subreddits} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <ul>
              {subreddits.map(subreddit => (
                <li key={subreddit.data.display_name}>
                {subreddit.data.display_name}
                <br/>
                {subreddit.data.subscribers}
                </li>
              ))}
            </ul>
        </header>
      </div>
    );
  }
}

export default App;
