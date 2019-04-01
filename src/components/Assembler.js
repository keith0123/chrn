import React, { Component } from 'react';
import 'styles/App.scss';
import SubRedditTopPost from 'components/reddit/SubRedditTopPost'
import HackerNewsItem from 'components/hackerNews/HackerNewsItem'

class Assembler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completeList: [],
      isLoading: false,
      error: null,
    };

    this.assembleList = this.assembleList.bind(this);
  }

  assembleList = (props) =>{

        this.setState({
            isLoading: true
        }) 

        let subreddits = this.props.subreddits;
        let hackerNewsPosts = this.props.hackerNewsPosts;

        subreddits.forEach((subreddit) =>{
            subreddit.chrnPostType = "reddit";
        })
        
        let completeListLocal = subreddits.reduce(function(arr, v, i) {
            return arr.concat(v, hackerNewsPosts[i]); 
         }, []);


        this.setState({
            completeList: completeListLocal,
            isLoading: false
        }) 
  }

  renderList = () =>{

    const completeList = this.state.completeList;
    const BASE_REDDIT_URL = "https://www.reddit.com"


      return (      
      
      <div className="assembler">
            
        {completeList.map( element =>{

            if(element.chrnPostType === "reddit"){

               return( <div className="liDiv fade-in" key={element.data.id}>
                    <div className="liImgDiv">
                        <img src={element.data.icon_img ? element.data.icon_img : "https://www.redditstatic.com/icon.png"} alt=""/>
                    </div>
                    <div className="li">
                        <a href={BASE_REDDIT_URL+element.data.url}>{element.data.display_name_prefixed}</a>
                        <br />
                        subs: {element.data.subscribers}
                        <br /><br />
                        <SubRedditTopPost subreddit={element.data.display_name}/>
                    </div>
                </div>)

            }else{

                return (<div className="liDiv fade-in" key={element}>
                    <div className="liImgDiv">
                      <img src="https://pbs.twimg.com/profile_images/378800000011494576/9c90acb704cbf9eef6135009c9bb5657_400x400.png" alt=""/>
                    </div>
                    <div className="li">
                      <HackerNewsItem id={element}/>
                    </div>
                </div>)
            }})}
             </div>
      )
  }

  componentDidMount(){
    this.assembleList()
  }

  render() {
    const {isLoading, error} = this.state;

    if (error) {
        return <p>{error.message}</p>;
      }
  
      if (isLoading) {
        return <p>Loading ...</p>;
      }

    return this.renderList();
  }
}

export default Assembler;
