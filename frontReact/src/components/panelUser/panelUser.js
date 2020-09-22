import React from 'react'
import Cookies from 'js-cookie'


export default class PanelUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            btnBoolean: false,
            userNameInCookie: null
        }
        this.clickBtnLogin = this.clickBtnLogin.bind(this);
        this.clickBtnLogout = this.clickBtnLogout.bind(this);
    }

    componentDidMount() {
        if (Cookies.get("user")===undefined){
            this.setState({
                btnBoolean:false
            })
            
        } else if (Cookies.get("user")!==undefined) {
            this.setState({
                btnBoolean: true,
                userNameInCookie: Cookies.get("user")
            })
        }
    }
    
    clickBtnLogout() {
        Cookies.remove("user")
        this.setState({
            btnBoolean: false,
            userNameInCookie: null
        })
    }

    clickBtnLogin() {
        Cookies.set("user", "Admin", "secure")
        this.setState({
            btnBoolean: true,
            userNameInCookie: Cookies.get("user")
        })
        // Cookies.remove("user")
    }

    render() {
        const { btnBoolean, userNameInCookie } = this.state;
        if (btnBoolean===false) {
            return(
                <div>
                    <button onClick={this.clickBtnLogin}>Войти</button>
                </div>
            )
        } else if (btnBoolean===true) {
            return(
                <div>
                    <button onClick={this.clickBtnLogout}>{userNameInCookie}</button>
                </div>
            )
        }
        
    }
}