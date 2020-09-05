import React, { Component } from 'react'
import CreatePost from './components/createPost/createPost';
import { postAPost,} from './components/api/http';
import AboutSite from './components/md/aboutSite';
import Ads from './components/ads/ads';
import './app.css'
// import Cookies from 'js-cookie';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataGetPosts: [],
        
      }
      this.createNewPost = this.createNewPost.bind(this);
      this.changeColor = this.changeColor.bind(this);
    }


    
    createNewPost(post) {
      return postAPost(post)
      // console.log(post)
    }
    changeColor(){

    }
    
    render() {
      return (
        <div className="AppDivMain">
          
          {/* <button onClick={this.changeColor}>Поменять цвет</button> */}
          <AboutSite/>
          <CreatePost onSubmit={this.createNewPost} updatePost={this.updatePosts}/>
          <Ads/>
        </div>
      )
    }
  }


export default App;