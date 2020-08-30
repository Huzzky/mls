import React from 'react'
import { YMaps, Map, Placemark} from 'react-yandex-maps'
import './mapInPost.css'

export default class MapInReact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openMapInPostBool: false, 
        }
        this.openMapInPost = this.openMapInPost.bind(this);
    }

    openMapInPost() {
        const { openMapInPostBool } = this.state;
        if (!openMapInPostBool){
            this.setState({
                openMapInPostBool: true,
            })
        } else if (openMapInPostBool){
            this.setState({
                openMapInPostBool: false,
            })
        }
        
    }

    render() {
        if(this.props.long===0.0 && this.props.lat===0.0){
            return(
                <React.Fragment/>
            )
        }else{
            if (!this.state.openMapInPostBool){
                return(<a onClick={this.openMapInPost}>Показать карту</a>)
                
            } else if (this.state.openMapInPostBool){
                return(
                    <div>
                        <YMaps>
                            <div className="mapInPost-div">
                                <Map defaultState={{ center: [this.props.long, this.props.lat], zoom: 10,}} width="95%" >
                                    <Placemark geometry={[this.props.long, this.props.lat]}/>
                                </Map>
                            </div>
                        </YMaps>
                        <a onClick={this.openMapInPost}>Убрать карту</a>
                    </div>
                )
            }
        }
    }
}