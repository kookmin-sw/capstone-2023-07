import React, {Component} from 'react';
import api from '../api';

class Mainpage extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:''
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

    onChangeText = (e) => {
        this.setState({
            text: e.target.value,
        });
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.state.text
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
        const { handleSubmit, onChangeText } = this
        return(
            <div>
                <div className="main-page">
                    <div className='main-center'>
                        <a href='/'><img src='./img/main_bean.png'/></a>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='input-group'>
                                    <input type='text' placeholder='캐릭터 명을 입력해주세요!' onChange={onChangeText}/>
                                    <button className='' type='submit'></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='bean-body'>
                        <div className='belly'>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mainpage