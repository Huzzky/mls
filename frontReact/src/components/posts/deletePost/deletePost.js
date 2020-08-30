import React from 'react'
import { postDelete } from '../../api/http';

export default class DeletePost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: null,
        }
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost(){
        postDelete(this.props.idPost)
        this.props.clickDeletePost(true)
    }

    render() {
        return(
            <div>
                <button onClick={this.deletePost}>Удалить</button>
            </div>
        )
    }
}