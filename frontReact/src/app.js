import React, { Component } from 'react'
import CreatePost from './components/createPost/createPost';
import { postAPost, getPost,} from './components/api/http';
import AboutSite from './components/md/aboutSite';
import Ads from './components/ads/ads';
import './app.css'
import PanelUser from './components/panelUser/panelUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Cookies from 'js-cookie';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataGetPosts: [],
        waySiteBool: false,
      }
      this.createNewPost = this.createNewPost.bind(this);
    }
    
    createNewPost(post) {
      return postAPost(post)
      // console.log(post)
    }
    
    render() {
      const { waySiteBool } = this.state;
      return (
        <div>
          <PanelUser/>
          <div className="AppDivMain">
            <AboutSite/>
            <CreatePost onSubmit={this.createNewPost} updatePost={this.updatePosts}/>
            <Ads/>
          </div>
        </div>
        
      )
    }
  }


export default App;