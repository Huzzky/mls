import React, { Component } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
// * Библиотека invariant гарантирует, что компонент Route никогда не будет отображаться, или, если это произойдет,
// * будет показана ошибка

export default class Route extends Component{
    static propTypes = {
        path: PropTypes.string, // * Маршрут
        component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), // * Функция
    };
    render() {
        // return invariant(false, "<Route> elements are for coding only and shouldn't be rendered");
        return(<div></div>)
        
    }
}