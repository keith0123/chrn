import React, { Component } from 'react';
import 'styles/App.scss';

class SubRedditLinkLogo extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

    render(){

      const BASE_REDDIT_URL = "https://www.reddit.com"

        return(

            <div className="liImgDiv">
            <a href={this.props.url}>
                <img src={this.props.subreddit.icon_img ? this.props.subreddit.icon_img : "https://www.redditstatic.com/icon.png"} alt=""/>
            </a>
          </div>
        );
    }
}

export default SubRedditLinkLogo;
