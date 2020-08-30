import { Component } from "react";
import PropTypes from 'prop-types'
// ? enroute - крошечный функциоанльный роутер, который для сопоставления строковых URL-адресов
import enroute from 'enroute'
import invariant from 'invariant'

export default class Router extends Component{
    static propTypes = {
        children: PropTypes.array,
        location: PropTypes.string.isRequired
    };

    constructor(props){
        super(props);
        // * Маршруты будут зраниться в компоненте роутера в объекте
        this.routes = {};

        /*
        * Передача маршрутов в enroute.
        * Render будет задействовать возвращаемое enroute значение для установления 
        * соответсвия URL-адресов компонентам
        */ 
        this.router = enroute(this.router);
        this.addRoutes(props.children);
    };
    
    addRoutes() {
        React.Children.forEach(this.routes, route => this.addRoute(route, parent));
    }

    cleanPath(path) {
        return path.replace(/\/\//g, '/');
    }

    addRoute(element, parent) {
        
        // * Деструктитирование, чтобы получить компонент, маршрут и свойства потомков
        const { component, path, children } = element.props;
    
        // * Удостоверение, что каждый Route имеет маршрут и свойство компонента или выдает ошибку
        invariant(component, 'Route ${path} is missing the "path" property');
        invariant(typeof path === 'string', 'Route ${path} is not a string');
    
        // * Функция, которую передаем в enroutе, которая принимает связанные параметры и дополнительный данные
        const render = (params, renderProps) => {
            
            // * Объединение свойств предка и дочерного компонента
            const finalProps = Object.assign({ params },
                this.props, renderProps);
    
            // * Создание нового компонента с объединенными свойствами
            const children = React.createElement(component, finalProps);
                // * Если есть предок, вызывается метод render с родительскими параметрами,
                // * но и с написанными вами потомками
                return parent ? parent.render(params, { children }) : children;
        
        };

        // * Использование обработчика normalizeRoute, чтобы убедиться, что URL-путь настроен правильно
        const route = this.normalizeRoute(path, parent);

        if (children) {
            // * Если в текущем компоненте Route есть и другие вложенные компоненты, процесс повторяется и в маршрут
            //* передается и родительский компонент
            this.addRoutes(children, {route, render});
        };

        //* Применение утилиты cleanPath для создания маршрута в объекте маршрутов и назначение ему законченной функции
        this.routes[this.cleanPath(route)] = render;
    
    };

    normalizeRoute(path, parent) {
        if (path[0]==='/'){
            return path;
        }
        
        if (!parent) {
            return path;
        }

        return '${parent.route}/${path}';
    }

    // * Указание PropTypes - роутер получит потомков и локацию для работы
    render () {
        // * Передача текущего местоположения роутеру в качестве свойства
        const { location } = this.props;

        // * Использование invariant, чтобы убедиться в том, что вы не забыли указать местоположение
        invariant(location, '<Router> needs a location to work');

        // * Применение роутера для нахождения соответствия местоположению и возврата соответсвтующего компонента  
        return this.router(location);
    }
}

function edit_user(params, props) {
    return Object.assign({}, params, props);
}

const router = enroute ({
    /*
    * Передача объекта с маршрутами и функциями
    */

    '/users/new': create_user,  // 'маршрут': функция
    '/users/:slug': find_user,
    '/users/:slug/edit': edit_user,
    '*': not_found
});




enroute('/users/mark/edit', {additional: 'props'})