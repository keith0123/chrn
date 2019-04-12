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

      return (      
      
      <div className="assembler">
            
        {completeList.map( element =>{

            if(element.chrnPostType === "reddit"){
              return( 
                <SubRedditTopPost subreddit={element.data} key={element.data.id}/>
              )
            }else{
              return (
                <HackerNewsItem id={element} key={element}/>
              )
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
