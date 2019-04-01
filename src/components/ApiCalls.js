import React, { Component } from 'react';
import 'styles/App.scss';
import Assembler from 'components/Assembler'

class ApiCalls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subreddits: [],
      hackerNewsPosts: [],
      isLoading: false,
      error: null,
    };

    this.getTopSubreddits = this.getTopSubreddits.bind(this);
    this.getHackerNewsPosts = this.getHackerNewsPosts.bind(this);
  }

  getTopSubreddits = () =>{

    this.setState({ isLoading: true });

    fetch("https://www.reddit.com/subreddits/popular/.json")
    .then(response =>  {    
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
      }
    })
    .then(result => {

        this.setState({
          subreddits: result.data.children,
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

  getHackerNewsPosts = () =>{

    const JSON_QUERY = '.json?print=pretty';
    const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

    this.setState({ isLoading: true });

    fetch(`${BASE_URL}/topstories${JSON_QUERY}`)
    .then(response =>  {    
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
      }
    })
    .then(result => {

        const slice = result.slice(0, 25);

        this.setState({
            hackerNewsPosts: slice,
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


  componentDidMount(){
    this.getTopSubreddits();
    this.getHackerNewsPosts();
  }

  render() {
    const {subreddits, hackerNewsPosts, isLoading, error} = this.state;

    if (error) {
        return <p>{error.message}</p>;
      }
  
      if (isLoading) {
        return <p>Loading ...</p>;
      }

      if(subreddits.length > 0 && hackerNewsPosts.length > 0){
          return (
            <Assembler subreddits={subreddits} hackerNewsPosts={hackerNewsPosts} />
        );
      }
      else{
        return <p>Loading ...</p>;
      }
  }
}

export default ApiCalls;
