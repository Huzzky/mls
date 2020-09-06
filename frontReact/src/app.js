import React, { Component } from 'react'
import CreatePost from './components/createPost/createPost';
import { postAPost, getPost,} from './components/api/http';
import AboutSite from './components/md/aboutSite';
import Ads from './components/ads/ads';
import './app.css'
import Cookies from 'js-cookie'
import axios from 'axios'
// import Cookies from 'js-cookie';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataGetPosts: [],
        waySiteBool: false,
      }
      this.createNewPost = this.createNewPost.bind(this);
      this.changeColor = this.changeColor.bind(this);
      this.waySite = this.waySite.bind(this);
      this.waySite2 = this.waySite2.bind(this);
    }

    waySite() {
        const axios = require('axios');
        return axios.get('http://192.168.1.66:8000/mls/scg/')
        .then(function(data) {
          console.log(data.data);
        })
        .catch(function(error) {
          console.log(error)
        })
    }
    waySite2() {
      // const axios = require('axios');
      //   return axios.get('http://192.168.1.66:8000/mls/scg/')
      //   .then(function(data) {
      //     console.log(data.data);
      //   })
      //   .catch(function(error) {
      //     console.log(error)
      //   })
      // Cookies.get() 
      // console.log(Cookies.withAttributes({domain: 'localhost:3000' }))
      // console.log(Cookies.get('name'))
      // document.cookie = "domain:localhost:3000"
      // Cookies.set("name", "value")
      // alert( document.cookie );
      // Cookies.remove("name")
      // console.log(Cookies.get())

      const axios = require('axios');
      axios.post('http://192.168.1.66:8000/mls/sc/', {
        "cookie": "test"
      }).catch(function (error) {
        console.log(error);
      })
    
    }
    
    createNewPost(post) {
      return postAPost(post)
      // console.log(post)
    }
    changeColor(){

    }
    
    render() {
      const { waySiteBool } = this.state;
      return(
        <div>
          <button onClick={this.waySite}>Set</button>
          <button onClick={this.waySite2}>Get</button>
        </div>
      )
      // return (
      //   <div className="AppDivMain">
          
      //     {/* <button onClick={this.changeColor}>Поменять цвет</button> */}
      //     <AboutSite/>
      //     <CreatePost onSubmit={this.createNewPost} updatePost={this.updatePosts}/>
      //     <Ads/>
      //   </div>
      // )
    }
  }


export default App;