import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filter from 'bad-words';
import {v4 as uuidv4} from 'uuid';
import Post from '../posts/posts'
import DisplayMap from '../map/displayMap';
import "./createPost.css"



const filter = new Filter(); // * Применение конструктора для создаия нового экземпляра фильтра

class CreatePost extends Component {
    static propTypes = {
        content: PropTypes.string,
    }
    constructor(props){
        super(props);
        // * Установка состояния
        this.state = {
            content: "",
            valid: false,
            booleanUpdatePosts: false,
            eventOpenCreatePost: false,
            clickOpenMapInPost: false,
            location: null,
            isLoadedMap: false,
            updatePosts: false,
            location: {
                long: 0.0,
                lat: 0.0
            },
            
            // * Создание простого свойства valid в локальном состоянии компнонента
       }
        //* Установка обработчиков событий
        this.handleSubmit = this.handleSubmit.bind(this); 
        // * Методы класса Bind для обработки передаваемых данных и публикаций изменений
        this.handlePostChange = this.handlePostChange.bind(this);
        // * Объявление метода обработки события отправи, React передаст событие обработчику
        this.chan = this.chan.bind(this);
        this.eventOpenCreatePostBtn = this.eventOpenCreatePostBtn.bind(this);
        this.openAddMap = this.openAddMap.bind(this);
        this.closeAddMap = this.closeAddMap.bind(this);
        this.getLocationOfCards = this.getLocationOfCards.bind(this);

    }
    handlePostChange(event) {
        if (this.state.clearTextarea===false){
            // * Объявление метода для класса, который будет использовать при обновлении текста тела(onChange)
            const content = filter.clean(event.currentTarget.value);
            // ? Передача значения в форму методу .clean() фильтра и использование возвращаемого значение для 
            // ? установки состояния

            // * Захват значения элемента textarea из свойства value элемента DOM
            this.setState(() => {
                //* Использование этого значения для установки состояния и обновления его с новым значением
                return {
                    content,
                    valid: content.length <= 280, 
                    /* 
                    * Определение допустимости сообщения путем установки максимальной длины.
                    * Сообщение должно быть не более 280 символов
                    */ 
                };
            });
        } else if (this.state.clearTextarea===true){
            event.currentTarget.value = "";
            this.setState({
                clearTextarea: false
            });
        }
    }
    handleSubmit(event) {
        
        event.preventDefault()
        if (!this.state.valid) {
            return;
        }
        if (this.state.location.long==="" && this.state.location.lat===""){
            const DATA = {
                content_post: this.state.content,
                uuid_post : uuidv4(),
                user_post_id: 1,
                long_loc_post: null,
                lat_loc_post: null
            };
            this.props.onSubmit(DATA);
        } else {
            const DATA = {
                // * Создание нового объекта публикации
                content_post: this.state.content,
                uuid_post : uuidv4(),
                user_post_id: 1,
                long_loc_post: this.state.location.long,
                lat_loc_post: this.state.location.lat
    
            };
            this.props.onSubmit(DATA);
        }
        
        this.setState({
            clearTextarea: true,
            content: '',
            valid: null,
            booleanUpdatePosts:true,
            clickBtnCreatePost: true,
            updatePosts: true,
            location: {
                long: 0.0,
                lat: 0.0
            },
            clickOpenMapInPost: false,
            
            
            // TODO сделать, чтобы textarea очистилась после нажатия на кнопку
        });
        console.log(this.state.clearTextarea, 'this btn')
        
    }
    componentDidMount() {
        this.setState({
            textarea: <textarea placeholder="What's on your mind?" className="txtarea-cp" onChange={this.handlePostChange}/>,
            clearTextarea: false,
        })
    }
    
    chan(boole){
        if (!boole){
        this.setState({
            booleanUpdatePosts: false
        })}
    }
    eventOpenCreatePostBtn() {
        this.setState({
            eventOpenCreatePost: true
        })
    }
    openAddMap(){
        this.setState({
            clickOpenMapInPost: true
        })
    }
    closeAddMap(){
        this.setState({
            clickOpenMapInPost: false,
        })
        
    }

    getLocationOfCards(location) {
        this.setState({
            location: location
        })
    }

    
    


    render() {
        const { booleanUpdatePosts, textarea, clickOpenMapInPost } = this.state;
            if(clickOpenMapInPost){
                return(
                    <div className="main-div-createpost">
                        <div className="sec-div-createpost">
                            {textarea}
                            <DisplayMap sendLocation={this.getLocationOfCards} isLoadedCompWithMap={this.isLoadedCompWithMap}/>
                            <div className="panel-createpost-div">
                                <button id="btnPost" onClick={this.handleSubmit}>Пост</button>
                                <a onClick={this.closeAddMap}>Убрать карту</a>
                            </div>
                            
                            
                        </div>
                        <Post updatePosts={booleanUpdatePosts} onChan={this.chan}/>
                       
                    </div>)
            } else if (!clickOpenMapInPost) {
                return(
                    <div className="main-div-createpost">
                        <div className="sec-div-createpost">
                            {textarea}
                            <div className="panel-createpost-div">
                                <button id="btnPost" onClick={this.handleSubmit}>Пост</button>
                                <a onClick={this.openAddMap}>Добавить карту</a>
                            </div>
                        </div>
                        <Post updatePosts={booleanUpdatePosts} onChan={this.chan}/>
                    </div>)
            }
        }
        
    }


export default CreatePost;
