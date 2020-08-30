import React, { Component } from 'react'
import { getPost } from '../api/http';
import './posts.css'
import adminsvg from './img/wrench.svg'
import MapInReact from './map/mapInPost';
import DeletePost from './deletePost/deletePost';
class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            reversePostDateBool: false,
            btnDeletePost: false,
        };
        this.getPostFunc = this.getPostFunc.bind(this);
        this.reversePostDate = this.reversePostDate.bind(this);
        this.clkBtnDelete=this.clkBtnDelete.bind(this);
    }

    getPostFunc(){
        getPost()   
        .then( response => {
            if(response.status>=200){
                    const DATA_TEST = response.data.posts;
                        this.setState({
                            data: DATA_TEST,
                            isLoaded:true
                        });
                        console.log(DATA_TEST)
                }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    componentDidMount() {
        this.getPostFunc()
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.updatePosts===true || this.props.updatePosts===true) {
            if(this.state.btnDeletePost===false || this.state.btnDeletePost===true){
                this.getPostFunc() 
                this.setState({
                    bole:false
                })
                this.props.onChan(this.state.bole)  
            } 
        }
        return true;    
    }
    
    
    reversePostDate() {
        if (this.state.reversePostDateBool===true){
            this.setState({
                data: this.state.data.reverse(),
                reversePostDateBool: false,
            })
            // console.log(this.state.data)
            
        } else if (this.state.reversePostDateBool===false){
            this.setState({
                data: this.state.data.reverse(),
                reversePostDateBool:true,
            })
            // console.log(this.state.data)
        }
    }

    clkBtnDelete(clickOrNO){
        this.setState({
            btnDeletePost: clickOrNO,
        })
    }


    
    render() {
        const { data, isLoaded } = this.state;
        if (data.length>0){
            const POSTS_LIST = data.map((value, number) => 
                <div className="mainDiv-post" key={number}>
                    <div className="secDiv-post">
                        <div className="t-Div-post">

                            <p className="p-div-post user_post"><img className="img-user-post"
                            src={adminsvg} alt="Admin Img" width="20" height="20"/>{value.user_post}</p> 
                            <p className="p-div-post date_post">{value.date_post}</p>
                        </div>
                        <hr className="hr-post"/>
                        <div className="f-div-post">
                            <p className="p-div-post-content content_post">{value.content_post}</p>
                            {/* <p key={value.id_post} className="p-div-post">Удалить</p> */}
                            
                        </div>
                        <MapInReact long={value.long_loc_post} lat={value.lat_loc_post}/> 
                        <div className="down-panel-post">
                                <DeletePost idPost={value.id_post} clickDeletePost={this.clkBtnDelete}/>
                                <p>Comment</p>                         
                        </div>
                    </div>
                </div>
            );

        return(
            <div>
                {/* <a onClick={this.reversePostDate}>Sort</a> */}
                {POSTS_LIST}
            </div>
        )
        }
        else if(data.length===0 && isLoaded){
            return(<div className="no-post">
                <h3 className="post-und">Постов пока что нет, но Вы можете быть одним из первых</h3>
            </div>)
        } else if(data.length===0 && !isLoaded){
            return(<div className="no-post">
                <h3 className="loading">Загрузка, подождие</h3>
            </div>)
        }
    }
    }


export default Posts;