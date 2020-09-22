import axios from 'axios';


export function getPost(){
    const axios = require('axios');
    return axios.get('http://192.168.1.66:8000/mls/pg/?format=json')
    // return axios.get('http://172.20.10.4:8000/mls/pg/?format=json')
    .then(function(data) {
        // console.log(data.data);
        return data
    })
    .catch(function(error) {
        console.log(error)
    })
}


export function postAPost(data){
    // console.log(data)
    axios.post('http://192.168.1.66:8000/mls/pp/', {
    // axios.post('http://172.20.10.4:8000/mls/pp/', {
            
                "posts": {
                    content_post: data.content_post,
                    user_post_id: data.user_post_id,
                    uuid_post: data.uuid_post,
                    long_loc_post: data.long_loc_post,
                    lat_loc_post: data.lat_loc_post
                }
            
        }).catch(function (error) {
            console.log(error);
          })
    }

export function postDelete(id){
    // axios.delete('http://172.20.10.4:8000/mls/pd/'+id)
    axios.delete('http://192.168.1.66:8000/mls/pd/'+id)
}
