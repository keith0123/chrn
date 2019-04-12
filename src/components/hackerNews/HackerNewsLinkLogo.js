import React, { Component } from 'react';
import 'styles/App.scss';

class HackerNewsLinkLogo extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="liImgDiv">
            <a href={this.props.url}>
            <img src="https://pbs.twimg.com/profile_images/378800000011494576/9c90acb704cbf9eef6135009c9bb5657_400x400.png" alt=""/>
          </a>
        </div>
    );
  }
}

export default HackerNewsLinkLogo;
