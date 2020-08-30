import React from 'react'
import './aboutSite.css'

export default class AboutSite extends React.Component{

    render() {
        return(
            <div className="md-md">
                <div className="sec-div-as">
                    <div className="third-div-as">
                        <h1 className="h1-main-as">Welcome!</h1>
                        <p className="p-as">
                        Далеко-далеко за словесными горами в стране гласных и согласных живут <a href="https://ru.wikipedia.org/wiki/Lorem_ipsum">рыбные тексты</a>. 
                        Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. 
                        </p> 
                            <li className="li-as">Какой-то нужный, наверное, текст</li>
                            <li className="li-as">Но здесь его не будет</li>
                            <li className="li-as">Сделай вид, что он есть</li>
                            <li className="li-as">И что ты читаешь новый том "Войны и мир"</li>
                            <li className="li-as">Воды здесь столько же, сколько в Солярисе</li>
                        <p className="p-as">Если у Вас возникли затруднения или проблемы, то напишите на <a href="ya.ru">vladislav.bychkov01@gmail.com</a></p>
                        <p className="p-as">Мой GitHub:
                        <a href="https://github.com/Huzzky"> Huzzky</a></p>
                        <p className="p-as">Мой Vk:
                        <a href="https://vk.com/h4zci"> Vladislav Bychkov</a></p>
                        
                    </div>
                </div>
            </div>
        )
    }

}