import React, { Component } from 'react'
import { YMaps, Map, Placemark} from 'react-yandex-maps'
import './displayMap.css'

export default class DisplayMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: {
                long: null,
                lat: null,
                mapIsLoaded: false,
            }
            
        };
        this.clickOnMap = this.clickOnMap.bind(this);
    }



    componentDidMount() {
    }


    clickOnMap(event) {
        this.setState({
            location:{
                long: event.get('coords')[0],
                lat: event.get('coords')[1]
            }
        })
        this.props.sendLocation(this.state.location)
    }

    render() {
        return [
            <div className="main-div-map">
                <YMaps>
                    <div className="second-div-map">
                        <Map defaultState={{ center: [55.751574, 37.573856], zoom: 10,}} onClick={this.clickOnMap} width="95%">
                            <Placemark geometry={[this.state.location.long, this.state.location.lat]}/>
                        </Map>
                    </div>
                </YMaps>
            </div>
        ];
    }
}