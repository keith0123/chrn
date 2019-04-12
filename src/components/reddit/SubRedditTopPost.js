import React, { Component } from 'react';
import 'styles/App.scss';
import SubRedditLinkLogo from 'components/reddit/SubRedditLinkLogo'

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
        
      fetch(`https://www.reddit.com/r/${this.props.subreddit.display_name}/hot/.json?print=pretty&limit=1`)
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
          <div className="liDiv fade-in">
            <SubRedditLinkLogo url={topPost.url} subreddit={this.props.subreddit}/>
            <div className="li">
              <a href={topPost.url}>{topPost.title}</a>
              <br /><br />
              <a href={BASE_REDDIT_URL+this.props.subreddit.url}>{this.props.subreddit.display_name_prefixed}</a>
              <br />
              {this.props.subreddit.subscribers} subs
              <br /><br />
              {topPost.score} upvotes | <a href={BASE_REDDIT_URL+topPost.permalink}>{topPost.num_comments} comments</a>
            </div>
          </div>
        );
    }
}

export default SubRedditTopPost;
