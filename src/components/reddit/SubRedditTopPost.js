import React, { Component } from 'react';
import 'styles/App.scss';

class SubRedditTopPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topPost: [],
      error: null,
    };

    this.getTopPost = this.getTopPost.bind(this);
  }

  getTopPost = () =>{
        
      fetch(`https://www.reddit.com/r/${this.props.subreddit}/hot/.json?print=pretty&limit=1`)
      .then(response =>  {    
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
        }
      })
      .then(result => {
          this.setState({
              topPost: result.data.children[0].data
           });
        },
        (error) => {
          this.setState({
            error,
          });
        })
    }

    componentDidMount() {
      this.getTopPost();
    }

    render(){

      const{topPost} = this.state;
      const BASE_REDDIT_URL = "https://www.reddit.com"

        return(

          <div className="topPostDiv">
              <a href={topPost.url}>{topPost.title}</a>
              <br />
              {topPost.score} upvotes | <a href={BASE_REDDIT_URL+topPost.permalink}>{topPost.num_comments} comments</a>
          </div>
        );
    }
}

export default SubRedditTopPost;
