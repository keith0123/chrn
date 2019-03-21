import React, { Component } from 'react';
import 'styles/App.css';

class HackerNewsItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hackerNewsItem: [],
      isLoading: false,
      error: null,
    };

    this.getHackerNewsItem = this.getHackerNewsItem.bind(this);
  }

  getHackerNewsItem = (props) =>{

    const JSON_QUERY = '.json?print=pretty';
    const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

    this.setState({ isLoading: true });

    fetch(`${BASE_URL}/item/${this.props.id}${JSON_QUERY}`)
    .then(response =>  {    
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
      }
    })
    .then(result => {

        this.setState({
            hackerNewsItem: result,
            isLoading: false
        });
      },
      (error) => {
        this.setState({
          error,
          isLoading: false
        });
      })
  }

  componentDidMount() {
    this.getHackerNewsItem();
  }

  render() {
    const{hackerNewsItem, isLoading, error} = this.state;
    const HN_ITEM_URL = "https://news.ycombinator.com/item?id=";

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="hackerNewsItem">
        <a href={hackerNewsItem.url}>{hackerNewsItem.title}</a><br />
        <br /><br />
        {hackerNewsItem.score} points | <a href={HN_ITEM_URL+hackerNewsItem.id}>{hackerNewsItem.descendants} comments</a>
      </div>
    );
  }
}

export default HackerNewsItem;
