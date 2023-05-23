import React, {Component} from 'react';
import api from '../api';

class Header extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            text: props.username == null ? '' : props.username
        }
    }

    onChange = (e) => {
        this.setState({text:e.target.value})
    }

    onClick = (e) => {
        if(this.state.text.length > 0)
            this.call(this.state.text)
    }

    submit = (e) => {
        if(e.key === 'Enter' && e.target.value.length > 0) {
            this.call(e.target.value)
        }
    }

    call = (username) => {
        api.isUser(username)
        .then((res) => {
            if (res.state == 'succsess') {
                window.location.href = '/user?username=' + username;
            }
            else {
                window.location.href = '/SearchFailed?username=' + username;
            }
        }).catch((err) => {
            window.location.href = '/SearchFailed?username=' + username;
        })
    }

    render() {
        return(
        <div className="main-header">
            <div>
                <div className="logo">
                    <a href='/'>
                        <img src="./img/logo.png"/>
                    </a>
                </div>
                <div className="search-container">
                    <input type="text" placeholder="캐릭터 명을 입력해주세요" value={this.state.text} onChange={this.onChange} onKeyDown={this.submit}></input>
                    <div className="search-button" onClick={this.onClick}>
                        <img src="./img/searchIcon.png"/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Header