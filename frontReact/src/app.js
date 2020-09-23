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
import AuthUser from './components/auth/auth';

// import Cookies from 'js-cookie';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataGetPosts: [],
        waySiteBool: false,
        openUserPanelOrAuth: "No"
      }
      this.createNewPost = this.createNewPost.bind(this);
      this.UserPanelOpen = this.UserPanelOpen.bind(this);
    }
    
    createNewPost(post) {
      return postAPost(post)
      // console.log(post)
    }

    UserPanelOpen(valueOpenUserPanelOrAuth) {
      console.log(valueOpenUserPanelOrAuth)
      if (valueOpenUserPanelOrAuth==="Auth") {

        this.setState({
          openUserPanelOrAuth: "Auth"
        })

      } else if (valueOpenUserPanelOrAuth==="User") {

          this.setState({
            openUserPanelOrAuth: "User"
          })

        }

      }
    
    render() {
      const { openUserPanelOrAuth } = this.state;
      if (openUserPanelOrAuth===undefined || openUserPanelOrAuth===null || openUserPanelOrAuth==="No"){
        return (
          <Router>
            <Switch>
              <Route path='/'>
                <div>
                  <PanelUser userOrAuth={this.UserPanelOpen}/>
                    <div className="AppDivMain">
                      <AboutSite/>
                      <CreatePost onSubmit={this.createNewPost} updatePost={this.updatePosts}/>
                      <Ads/>
                    </div>
                </div>
              </Route>
              
            </Switch>
            
          </Router>
          
        )
      } else if (openUserPanelOrAuth==="Auth") {}
        return(
          <Router>
            <Switch>
              <Route path="/auth">
                <AuthUser/>
                <div>Фарва</div>
              </Route>
            </Switch>
          </Router>
        )
    }
  }


export default App;