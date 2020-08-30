import React from 'react';
import book_1 from './img/book_1.jpg'
import bool_2 from './img/book_2.jpg'
import './ads.css'

export default class Ads extends React.Component{

    render() {
        return(
            <div className="div-img-ads">
                <a href="https://ru.wikipedia.org/wiki/O_RLY%3F"><img src={book_1} className="img-ads-1" width='380' height='480'></img></a>
                <p>ads by <a href="https://ru.wikipedia.org/wiki/O_RLY%3F">O RLY?</a></p>
                <a href="https://ru.wikipedia.org/wiki/O_RLY%3F"><img src={bool_2} width='380' height='480' className="img-ads-2"></img></a>
                <p>ads by <a href="https://ru.wikipedia.org/wiki/O_RLY%3F">O RLY?</a></p>
            </div>
        )
    }

}