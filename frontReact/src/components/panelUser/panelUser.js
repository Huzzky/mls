import React from 'react'
import Cookies from 'js-cookie'


export default class PanelUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        Cookies.remove("name")
        const axios = require('axios');
        return axios.post('http://192.168.1.66:8000/mls/ua/?format=json', 
        {'name_user' : "Admin"}
        )
        .then(function(data) {
            console.log(data.data)
            // if (data.answerAuth===true) {
            //     console.log(data)
            // }
            
        })
    }

    render() {
        return(
            <div>
                <button>Войти</button>
            </div>
        )
    }
}